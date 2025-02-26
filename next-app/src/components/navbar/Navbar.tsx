"use client";

import { logout } from "@/lib/actions/auth";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type IProps = {
  email: string;
};

const Navbar: React.FC<IProps> = ({ email }) => {
  return (
    <nav className="w-full h-[3rem] border-b border-cyan-500 sticky top-0 flex justify-start items-center gap-2 py-1 px-4">
      <Button variant="link" className="text-cyan-400" onClick={() => logout()}>
        <LogOutIcon className="transform -rotate-180" />
        LOGOUT
      </Button>
      <Button variant="ghost" className="text-cyan-400">
        {email}
      </Button>
    </nav>
  );
};

export default Navbar;
