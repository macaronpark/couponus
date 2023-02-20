import { publicProcedure, T } from "../..";
import { z } from "zod";
import { read } from "../database/utils";
import { User } from "../interfaces/user";

export const authRouter = (t: T) =>
  t.router({
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(({ input }) => {
        const data = read({ fileName: "users" }) as User[];

        const user = data.find(
          (user) => user.username === input.username && user.password === input.password
        );

        return user ? true : false;
      }),
  });
