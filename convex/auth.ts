// convex/auth.ts
import { Auth } from "convex/server";

import { authOptions } from "../app/api/auth/[...nextauth]/route"; // adjust path if needed
import { getServerSession } from "next-auth";

export const auth: Auth = async (ctx) => {
  const req = ctx.request;

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return {
    tokenIdentifier: session.user.email,
    name: session.user.name ?? "",
    email: session.user.email,
    imageUrl: session.user.image ?? "",
  };
};
