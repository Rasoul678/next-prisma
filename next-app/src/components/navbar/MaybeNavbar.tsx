import { verifySession } from "@/lib/dal";
import { headers } from "next/headers";
import Navbar from "./Navbar";

type IProps = {};

const MaybeNavbar: React.FC<IProps> = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const showNavbar = pathname !== "/auth";
  const { isAuth, email } = await verifySession();

  if (!isAuth || !showNavbar) return null;

  return <Navbar email={email} />;
};

export default MaybeNavbar;
