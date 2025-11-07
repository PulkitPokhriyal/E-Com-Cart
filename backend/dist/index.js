import bodyparser from "body-parser";
import express from "express";
import env from "dotenv";
import z from "zod";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Redis } from "ioredis";
import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import { Middleware } from "./middleware.js";
import { userModel, cartItemModel } from "./db.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyparser.json());
env.config();
app.use(cors());
const saltRounds = 10;
const redis = new Redis(process.env.REDIS_URL);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
    },
});
const userSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, {
        message: "Password must contain at least one capital letter",
    })
        .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
    }),
});
app.post("/api/v1/signup", async (req, res) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(404).json({
            message: "Invalid input",
            errors: result.error,
        });
    }
    const { username, email, password } = result.data;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }
        await redis.set(`signup:${email}`, JSON.stringify({ username, email, password }), "EX", 300);
        await redis.set(`otp:${email}`, otp, "EX", 300);
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
        });
        return res.status(200).json({ message: "OTP sent to your email" });
    }
    catch (e) {
        console.log("Error during signup:", e);
    }
});
app.post("/api/v1/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }
    try {
        const storedOtp = await redis.get(`otp:${email}`);
        const userInfo = await redis.get(`signup:${email}`);
        if (storedOtp !== otp) {
            return res.status(404).json({ message: "Invalid or expired OTP" });
        }
        if (!userInfo) {
            return res.status(404).json({ message: "User info not found" });
        }
        const { username, email: userEmail, password } = JSON.parse(userInfo);
        const hashpassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userModel.create({
            username,
            email: userEmail,
            hashpassword,
        });
        await redis.del(`otp:${email}`);
        await redis.del(`signup:${email}`);
        const token = jwt.sign({
            id: newUser._id,
        }, process.env.JWT_PASSWORD);
        res.json({
            token: token,
        });
    }
    catch (e) {
        console.error("Error during OTP verification", e);
        return res.status(500).json({ message: "Server error" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if (!user.hashpassword) {
            return res.status(404).json({
                message: "User password is missing",
            });
        }
        const match = await bcrypt.compare(password, user.hashpassword);
        if (match) {
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_PASSWORD);
            res.json({
                token: token,
            });
        }
        else {
            res.status(404).json({
                message: "Incorrect cerdentials",
            });
        }
    }
    catch (e) {
        console.error("Error during login", e);
        return res.status(500).json({ message: "Server error" });
    }
});
app.post("/api/v1/addtocart", Middleware, async (req, res) => {
    try {
        const { productId, title, price, image, qty, rate, count } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: "User not authenticated!" });
        }
        const existingItem = await cartItemModel.findOne({ userId, productId });
        if (existingItem) {
            existingItem.qty += 1;
            await existingItem.save();
            return res
                .status(200)
                .json({ message: "Item added to cart successfully", existingItem });
        }
        const cartItem = await cartItemModel.create({
            userId: userId,
            productId: productId,
            title: title,
            price: price,
            image: image,
            qty: qty,
            rate: rate,
            count: count,
        });
        return res
            .status(200)
            .json({ message: "Item added to cart successfully", cartItem });
    }
    catch (e) {
        console.error("Error adding items to cart", e);
        return res.status(500).json({ message: "Server Error", e });
    }
});
app.get("/api/v1/cart", Middleware, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: "User not authenticated!" });
        }
        const cartItems = await cartItemModel.find({ userId });
        return res.status(200).json(cartItems);
    }
    catch (e) {
        console.error("Error get cart items", e);
        return res.status(500).json({ message: "Server error", e });
    }
});
app.delete("/api/v1/cart/:id", Middleware, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: "User not authenticated!" });
        }
        const productId = req.params.id;
        const existingItem = await cartItemModel.findOne({ userId, productId });
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        if (existingItem.qty > 1) {
            existingItem.qty -= 1;
            await existingItem.save();
            return res.status(200).json({
                message: "Quantity decreased by 1",
            });
        }
        await cartItemModel.deleteOne({ userId, productId });
        return res.status(201).json({ message: "Content deleted successfully" });
    }
    catch (e) {
        console.error("Error deleting cart item", e);
        return res.status(500).json({ message: "Server error", e });
    }
});
app.put("/api/v1/addqty/:id", Middleware, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ message: "User not authenticated!" });
        }
        const productId = req.params.id;
        const existingItem = await cartItemModel.findOne({ userId, productId });
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        existingItem.qty += 1;
        await existingItem.save();
        return res.status(200).json({
            message: "Quantity increased by 1",
        });
    }
    catch (e) {
        console.error("Error adding quantity to cart item", e);
        return res.status(500).json({ message: "Server error", e });
    }
});
async function main() {
    const mongoUri = process.env.MONGODB_STRING;
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}
main();
//# sourceMappingURL=index.js.map