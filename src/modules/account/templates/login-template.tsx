"use client";

import { useState } from "react";
import Register from "@modules/account/components/register";
import Login from "@modules/account/components/login";
import Link from "next/link"; // Import Link for navigation

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN);

  return (
    <div className="w-full flex justify-center px-0 py-8 bg-slate-gray">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <>
          <Login setCurrentView={setCurrentView} />
          <div className="text-center mt-4">
          </div>
        </>
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default LoginTemplate;
