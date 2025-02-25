import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

type IProps = {};
const Page: React.FC<IProps> = async () => {
  const { isAuth } = await verifySession();

  if (isAuth) {
    redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
