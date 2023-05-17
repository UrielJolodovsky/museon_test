import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID as string;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
  
    if (!clientId || !clientSecret || clientId.length === 0 || clientSecret.length === 0) {
      throw new Error("Missing Google credentials");
    }
    console.log("Good Credentials")
    return { clientId, clientSecret };
  }

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: getGoogleCredentials().clientId,
          clientSecret: getGoogleCredentials().clientSecret,
        }),
      ], 
}