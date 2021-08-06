import { db } from "@config/configIndex";
import { User } from "@models/modelsIndex";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: { jwt: true },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        db();
        const { email, password } = credentials;
        if (!email) throw new Error("Please enter email.");
        if (!password) throw new Error("Please enter password.");

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new Error("Invalid email or password");
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) throw new Error("Wrong Password");

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },

    session: async (session, token) => {
      session.user = await token.user;
      return Promise.resolve(session);
    },
  },
});
