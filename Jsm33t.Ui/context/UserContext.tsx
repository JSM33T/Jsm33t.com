"use client";
import { createContext, useContext, useState } from "react";

type User = {
	firstName: string;
	username: string;
	email: string;
	lastName: string;
	avatar: string;
};

const defaultUser: User = {
	firstName: "Welcome",
	username: "",
	email: "",
	lastName: "Guest",
	avatar: "/assets/images/default_user.jpg",
};

const UserContext = createContext<{
	user: User;
	setUser: (u: User) => void;
}>({
	user: defaultUser,
	setUser: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User>(defaultUser);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
