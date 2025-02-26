import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type IProps = {};

const Page: React.FC<IProps> = () => {
  return (
    <TabsList className="mt-20 flex justify-center items-center">
      <TabsTrigger className="w-1/2" value="login">
        Login
      </TabsTrigger>
      <TabsTrigger className="w-1/2" value="signup">
        Signup
      </TabsTrigger>
    </TabsList>
  );
};

export default Page;
