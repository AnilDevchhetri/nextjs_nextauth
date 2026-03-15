import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        passwrod: { label: "Password", type: "passwrod" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.passwrod) {
          throw new Error("Missing Email or Passowrd.");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
          const isValid = await bcrypt.compare(
            credentials.passwrod,
            user.passsowrd,
          );
          if (!isValid) {
            throw new Error("Invalid passowrd");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("login error: ", error);
          throw new Error("Login error occur");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
