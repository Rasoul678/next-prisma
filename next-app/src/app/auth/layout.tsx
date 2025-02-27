import { Tabs } from "@/components/ui/tabs";

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
