// import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt, encodedKey } from "./utils";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie, encodedKey);

  return { isAuth: !!session?.userId, userId: session?.userId };
});
