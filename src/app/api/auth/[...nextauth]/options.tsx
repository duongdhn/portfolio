import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';

interface User {
    id?: string;
    name: string;
    password?: string;
    email?: string;
    role?: string | null | undefined;
    accessToken?: string;
}

const users: User[] = [
    { id: "1", name: 'jsmith', email: "jsmith@example.com", password: "123456", role: "admin", accessToken: "123456" },
    { id: "2", name: 'janedoe', email: "janedoe@example.com", password: "654321", role: "user", accessToken: "654321"},
];

const findUserByToken = async (accessToken: string): Promise<User | null> => {
    return users.find(user => user.accessToken === accessToken) || null;
};


declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email?: string;
            role?: string | null | undefined;
            accessToken?: string;
        };
    }

    interface User {
        id?: string;
        name: string;
        email?: string;
        role?: string | null | undefined;
        accessToken?: string;
    }
}

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile: any): User {
                let userRole = "user";
                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    role: userRole,
                };
            },
        }),
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Username", type: "text", placeholder: "janedoe" },
                password: { label: "Password", type: "password", placeholder: "654321" }
            },
            async authorize(credentials, req): Promise<User | null> {
                const user = users.find(user => user.name === credentials?.name);

                //On Production
                //Create access token
                //Save token to db
                //Return User

                if (user && credentials?.password === user.password) {
                    const accessToken = uuidv4();

                    if (!user.accessToken) {
                        user.accessToken = accessToken;
                    }

                    return user;
                } else {
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            if (trigger === 'update') {
                const newName = session.user?.name;
                
                //On production
                //Update information in db
                //Get new user from db and return

                if (newName) {
                    const newAccessToken = uuidv4();
                    token.accessToken = newAccessToken; 
                    token.name = newName; 
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {

                //On Production
                //Find information user with access token
                //Return information user

                const userInfo = await findUserByToken(token.accessToken as string);
                if (userInfo) {
                    session.user.name = userInfo.name;
                    session.user.email = userInfo.email;
                    session.user.role = typeof token.role === 'string' ? token.role : userInfo.role ?? null;
                    session.user.accessToken = userInfo.accessToken;
                } 
            }

            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
