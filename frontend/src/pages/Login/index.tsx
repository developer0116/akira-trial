import { useState } from "react";
import { LoginForm, SignupForm } from "components";

export const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState<"login" | "signup">("login");

  return (
    <div className="bg-gray-200 w-100 h-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Artisan Trial
        </a>
        {currentForm === "login" ? (
          <LoginForm onNavigateToSignup={() => setCurrentForm("signup")} />
        ) : (
          <SignupForm onNavigateToLogin={() => setCurrentForm("login")} />
        )}
      </div>
    </div>
  );
};
