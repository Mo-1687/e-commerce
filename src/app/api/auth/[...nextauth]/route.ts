import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const NextOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          if (data?.message === "success" && data?.token) {
            const decodedToken: { id: string } = jwtDecode(data.token);
            return {
              id: decodedToken.id,
              userData: data.user,
              tokenApi: data.token,
            };
          }

          return data;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.user = user.userData;
        token.tokenApi = user.tokenApi;
      }

      // Handle session updates via update() function
      if (trigger === "update" && session) {
        // Update the user data in the token
        if (session.name !== undefined) {
          token.user = {
            ...token.user,
            name: session.name,
          };
        }
        if (session.email !== undefined) {
          token.user = {
            ...token.user,
            email: session.email,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.user = token.user;
      session.tokenApi = token.tokenApi;
      return session;
    },
  },
};

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
