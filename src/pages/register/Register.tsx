import { useRegisterCustomerMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
};

type TFormValues = typeof initialValues;

const validationSchema = Yup.object({
  firstName: Yup.string().required("* First name is required"),
  lastName: Yup.string().required("* Last name is required"),
  address: Yup.string().required("* Address is required"),
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "* Passwords must match")
    .required("* Confirm password is required"),
});

const Register = () => {
  const [register] = useRegisterCustomerMutation();
  const [phone, setPhone] = useState<string>("");
  const [phoneErr, setPhoneErr] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (values: TFormValues) => {
    if (!phone) {
      return setPhoneErr("Contact number is required");
    }
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      return setPhoneErr("Invalid phone number");
    }
    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await register({ ...values, phone });
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
      toast.success("Successfully registered", {
        description: "Now please log in",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-black">
      <div className="bg-gray-900 p-8 max-w-md w-full rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Website Logo"
              className="mb-4 w-32 md:w-40 transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <h2 className="text-3xl text-white font-bold text-center">
            Create an Account
          </h2>
          <p className="text-lg text-gray-400 mt-1 text-center">
            Join us to enjoy our services
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              {[
                "firstName",
                "lastName",
                "email",
                "address",
                "password",
                "confirmPassword",
              ].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-white text-lg font-semibold mb-2">
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <Field
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "address"
                        ? "textarea"
                        : "text"
                    }
                    name={field}
                    placeholder={`Enter your ${field
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md outline-none bg-white text-black"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              <div className="mb-4">
                <label className="block text-white text-lg font-semibold mb-2">
                  Your Phone Number
                </label>
                <PhoneInput
                  defaultCountry="BD"
                  international
                  placeholder="Enter your phone number"
                  onChange={(value) => setPhone(value as string)}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    phoneErr ? "border-red-500" : "border-gray-600"
                  } rounded-md outline-none bg-white text-black transition duration-200`}
                />
                {phoneErr && (
                  <p className="text-red-500 text-sm mt-1">{phoneErr}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-md font-bold bg-primaryMat text-white transition duration-200 hover:bg-black"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryMat hover:underline">
              Login
            </Link>
          </p>
        </div>
        <p className="mt-4 text-white text-sm text-center">
          Note: Your personal data will be used to support your experience
          throughout this website, to manage access to your account, and for
          other purposes described in our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default Register;
