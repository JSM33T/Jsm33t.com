import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: "TEST",
			clientSecret: "TEST",
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account?.id_token) token.idToken = account.id_token;
			return token;
		},
		async session({ session, token }) {
			session.idToken = token.idToken as string;
			return session;
		},
	},
};
