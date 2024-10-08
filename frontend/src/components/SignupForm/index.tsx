import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { signup } from "api";
import { isAxiosError } from "axios";
interface Props {
  onNavigateToLogin: () => void;
}
export const SignupForm = ({ onNavigateToLogin }: Props) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error">("error");
  const validationSchema = yup.object({
    fullname: yup.string().required("User name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),

    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setMessage("");
      try {
        await signup(values);
        setStatus("success");
        setMessage("Registered successfully! Please log in.");
      } catch (error) {
        if (isAxiosError(error)) {
          setStatus("error");
          setMessage(error.response?.data.detail);
        }
      }
    },
  });
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign up your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="user name"
              onChange={formik.handleChange}
              value={formik.values.fullname}
            />
            {formik.errors.fullname && (
              <div className="text-red-400 text-xs mt-1">
                {formik.errors.fullname}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="text-red-400 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirmation}
            />
            {formik.errors.passwordConfirmation && (
              <div className="text-red-400 text-xs mt-1">
                {formik.errors.passwordConfirmation}
              </div>
            )}
          </div>

          {message && (
            <div
              className={`${
                status === "success" ? "text-green-500" : "text-red-500"
              } text-s text-center mt-1`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {formik.isSubmitting ? "Signing up..." : "Sign up"}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            You already have an account?{" "}
            <button
              onClick={() => onNavigateToLogin()}
              className="font-medium text-blue-500 hover:underline dark:text-primary-500"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
