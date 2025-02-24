"use client";

import { addUser, getUsers } from "@/lib/actions";
import React from "react";

type IProps = {};

const Page: React.FC<IProps> = () => {
  const handleAddUser = async () => {
    const user = await addUser("Rasoul", "rasoul@gmail.com");
    console.log(user);
  };

  const handleGetUsers = async () => {
    const users = await getUsers();
    console.log(users);
  };

  return (
    <div>
      Add New User
      <hr />
      <button onClick={handleAddUser}>Add User</button>
      <hr />
      <button onClick={handleGetUsers}>Get Users</button>
    </div>
  );
};

export default Page;
