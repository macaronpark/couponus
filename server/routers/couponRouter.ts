import { publicProcedure, T } from "..";
import { z } from "zod";

export const couponRouter = (t: T) =>
  t.router({
    issuedList: publicProcedure.query(() => {
      return [
        {
          id: "issued-1",
          title: "집안일 1회권",
          issuedAt: "20220218T15:33:00",
          expiredAt: null,
          isUsed: false,
        },
        {
          id: "issued-2",
          title: "집안일 1회권",
          issuedAt: "20220220T10:02:00",
          expiredAt: null,
          isUsed: false,
        },
      ];
    }),
    receivedList: publicProcedure.query(() => {
      return [
        {
          id: "received-1",
          title: "집안일 1회권",
          issuedAt: "20220218T15:33:00",
          expiredAt: null,
          isUsed: false,
        },
      ];
    }),
    issue: publicProcedure
      .input(z.object({ title: z.string(), expiredAt: z.date() }))
      .mutation(({ input }) => {
        return {
          id: "id",
          title: input.title,
          issuedAt: new Date(),
          expiredAt: input.expiredAt,
          isUsed: false,
        };
      }),
    use: publicProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
      return {
        id: input.id,
        isUsed: false,
      };
    }),
  });
