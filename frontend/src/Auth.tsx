import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button.tsx";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSignUpSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const validationSignInSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState("signin");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const getButtonText = () => {
    if (isLoading) {
      if (mode === "signin") return "Signing in...";
      if (mode === "signup" && !showOtp) return "Loading...";
      if (mode === "signup" && showOtp) return "Authenticating...";
    }

    if (mode === "signin") return "Sign In";
    if (mode === "signup" && !showOtp) return "Get OTP";
    if (mode === "signup" && showOtp) return "Sign Up";

    return "Submit";
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
    validationSchema: showOtp
      ? otpValidationSchema
      : mode === "signup"
        ? validationSignUpSchema
        : validationSignInSchema,

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (!showOtp && mode === "signup") {
          const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
            username: values.username,
            email: values.email,
            password: values.password,
          });
          if (response.status === 200) {
            setShowOtp(true);
          }
        } else if (!showOtp && mode === "signin") {
          const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username: values.username,
            password: values.password,
          });
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("username", values.username);
            onClose();
            navigate("/dashboard");
          }
        } else {
          const response = await axios.post(
            BACKEND_URL + "/api/v1/verify-otp",
            {
              email: values.email,
              otp: values.otp,
            },
          );
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("username", values.username);
            onClose();
            navigate("/dashboard");
          }
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error("Full error:", e);
          console.error("Response data:", e.response?.data);
          console.error("Status code:", e.response?.status);
          if (e.response) {
            alert(e.response.data.error);
          } else {
            alert("Something went wrong. Please try again.");
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed z-50 flex justify-center inset-0 items-center">
          <div className="bg-white border rounded-md py-3 px-2">
            <div className="flex justify-center items-center pb-4 relative">
              <p className="font-semibold text-2xl">
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </p>
              <CloseIcon
                className="absolute right-0 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center pb-4 space-y-2"
              >
                <Input
                  name="username"
                  placeholder="Username"
                  size="sm"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.username}
                  </p>
                )}

                {mode === "signup" && (
                  <div className="w-full">
                    <Input
                      name="email"
                      placeholder="Email"
                      size="sm"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                )}
                <Input
                  name="password"
                  placeholder="Password"
                  size="sm"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}

                {mode === "signup" && (
                  <div className="w-full">
                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      size="sm"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>
                )}

                {showOtp === true && (
                  <div className="w-full">
                    <Input
                      name="otp"
                      placeholder="Enter OTP"
                      size="sm"
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.otp && formik.errors.otp && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.otp}
                      </p>
                    )}
                  </div>
                )}
                <Button
                  text={getButtonText()}
                  variant="primary"
                  size="sm"
                  type="submit"
                  loading={isLoading}
                />
              </form>
              <p>
                {mode === "signin"
                  ? "Need an account?"
                  : "Already have an account?"}
                <span
                  className="text-blue-700 underline hover:cursor-pointer"
                  onClick={() => {
                    setMode(mode === "signup" ? "signin" : "signup");
                  }}
                >
                  {mode === "signin" ? "SignUp" : "SignIn"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
