"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function GoogleLoginButton() {
	const { data: session } = useSession();

	useEffect(() => {
		const idToken = (session as any)?.idToken;
		if (idToken) {
			fetch("https://your-api.com/api/auth/google-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken }),
			});
		}
	}, [session]);

	return( 
		<button onClick={() => signIn("google")}>Login with Google</button>
	);
}
