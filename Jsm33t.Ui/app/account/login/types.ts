import type { JwtPayload } from 'jwt-decode';

export interface LoginResponse {
    accessToken: string;
}

export interface GoogleProfile {
    email: string;
    name: string;
    sub: string; // Google user ID
    picture: string;
    [key: string]: unknown;
}

export interface AppJwtPayload extends JwtPayload {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    avatar?: string;
    [claim: string]: unknown;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    avatar: string;
}
