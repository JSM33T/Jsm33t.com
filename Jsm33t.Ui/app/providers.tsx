"use client";

import { UserProvider } from "@/context/UserContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
	return <UserProvider>{children}</UserProvider>;
}
