"use client";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

type TFormValues = typeof initialValues;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});

const Login = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = Cookies.get("redirect");

  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data, error: err } = await login(values);
      const error: any = err;
      if (error) {
        if (error.status === 401) {
          return toast.error("Password didn't match", {
            description: "Try to remember your password and try again",
          });
        }
        if (error.status === 404) {
          return toast.error("Invalid email address", {
            description: "Enter a valid email address.",
          });
        }
        return toast.error(error.data?.message || "Unknown error occurred");
      }
      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }
      const authData = { user: data.data };
      dispatch(setUser(authData));
      Cookies.set("refreshToken", data.refreshToken, { expires: 30 });
      dispatch(setToken(data.accessToken || ""));
      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });
      redirect ? Cookies.remove("redirect") : "";
      navigate(redirect || "/profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Website Logo"
              className="mb-4 w-32 md:w-40 transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <h2 className="text-3xl text-white font-bold text-center">
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-400 mt-1 text-center">
            Please log in to your account
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-white text-lg">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-lg">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-primaryMat text-white font-semibold rounded-md shadow-md transition-all duration-200 
    ${
      isSubmitting
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-black hover:text-primaryMat hover:shadow-lg"
    }`}
              >
                <div className="flex items-center justify-center">
                  Login <LogIn className="ml-2" />
                </div>
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-primaryMat hover:underline">
              Create Account
            </Link>
          </p>
          <p className="text-white">
            Don't remember your password?{" "}
            <Link
              to="/forgot-password"
              className="text-primaryMat hover:underline"
            >
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
