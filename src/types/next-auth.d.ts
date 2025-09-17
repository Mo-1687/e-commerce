import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userData: {
      name: string;
      email: string;
      role: string;
    };
    tokenApi: string;
  }

  interface Session {
    id: string;
    user: User["userData"];
    tokenApi: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user: User["userData"];
    tokenApi: string;
  }
}

// Interface for session update data
export interface SessionUpdateData {
  name?: string;
  email?: string;
  role?: string;
}
