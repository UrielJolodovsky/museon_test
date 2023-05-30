import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

function getGoogleCredentials() {
  const clientId = "485883197597-47j16obop0g2cdqvd8mntll7tsb0jl2o.apps.googleusercontent.com"
  //process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = "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"
  //process.env.GOOGLE_CLIENT_SECRET as string;

  if (!clientId || !clientSecret || clientId.length === 0 || clientSecret.length === 0) {
    throw new Error("Missing Google credentials");
  }
  console.log("Good Credentials")
  return { clientId, clientSecret };
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}
const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      // console.log('tokenUsername', token.username);
      console.log("Session", session);
      console.log(session.user.id);
      //chech if the user is authenticated and if the token is not null
      if (token) {
        session.user.id = token.id as string;
      }

      return session;
    },
    jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.id = user.id;
      }
      console.log("JWT", token);
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string
}