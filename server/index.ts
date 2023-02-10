import { initTRPC } from "@trpc/server";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import http from "http";
import { z } from "zod";

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
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

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
  router: appRouter,
  createContext() {
    console.log("context 3");
    return {};
  },
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  handler(req, res);
});

server.listen(5000);
