import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions, SessionStrategy } from "next-auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/user";


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      await dbConnect();

      if (user) {
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.sub = dbUser._id.toString(); // ✅ Use MongoDB _id
        }
      }

      return token;
    },
    async signIn({ user, account }) {
      await dbConnect();
      // Only run on first sign in
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: account?.providerAccountId, // optional
        });
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};