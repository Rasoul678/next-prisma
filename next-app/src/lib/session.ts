import { cookies } from "next/headers";
import { UserDTO } from "./definitions";
import { encodedKey, encrypt } from "./utils";

export async function createSession(user: UserDTO) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = { ...user, expiresAt };

  const session = await encrypt(payload, encodedKey);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
