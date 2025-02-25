"use client";

import { logout } from "@/lib/actions/auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type IProps = {
  isAuth: boolean;
};

const Navbar: React.FC<IProps> = ({ isAuth }) => {
  return (
    <nav className="w-full h-[3rem] border-b border-cyan-500 sticky top-0 flex justify-start items-center gap-2 p-1">
      {isAuth ? (
        <Button variant="link" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <>
          <Link href="/auth/login" className="text-white hover:text-gray-200">
            Login
          </Link>
          <Link href="/auth/signup" className="text-white hover:text-gray-200">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
