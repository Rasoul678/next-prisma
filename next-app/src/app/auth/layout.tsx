import { Tabs } from "@/components/ui/tabs";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

type IProps = {
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
};

const AuthLayout: React.FC<IProps> = async ({
  children: TabsList,
  login: loginForm,
  signup: signupForm,
}) => {
  const { isAuth } = await verifySession();

  if (isAuth) {
    redirect("/");
  }
  return (
    <section className="w-full h-screen flex flex-col justify-start items-center">
      <Tabs defaultValue="login" className="w-4/5 md:w-3/5 lg:w-2/5">
        {TabsList}
        {loginForm}
        {signupForm}
      </Tabs>
    </section>
  );
};

export default AuthLayout;
