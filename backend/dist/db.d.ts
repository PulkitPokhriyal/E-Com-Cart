import mongoose, { Types } from "mongoose";
declare const userModel: mongoose.Model<{
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    hashpassword?: string | null;
    email?: string | null;
    username?: string | null;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
declare const cartItemModel: mongoose.Model<{
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    productId: number;
    title: string;
    price: number;
    qty: number;
    rate: number;
    count: number;
    createdAt: NativeDate;
    image?: string | null;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
export { userModel, cartItemModel };
//# sourceMappingURL=db.d.ts.map