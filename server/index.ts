import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions, createHTTPHandler } from "@trpc/server/adapters/standalone";
import http from "http";
import { authRouter } from "./src/routers/authRouter";
import { couponRouter } from "./src/routers/couponRouter";

function createContext(opts: CreateHTTPContextOptions) {
  return {};
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export type T = typeof t;

export const publicProcedure = t.procedure;
export const router = t.router;

const appRouter = router({
  coupon: couponRouter(t),
  auth: authRouter(t),
});

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
  router: appRouter,
  createContext({ req, res }) {
    console.log(`[${res.statusCode}] ${req.method}${" "}${req.url}${" "}`);
    return {};
  },
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Set-Cookie", ["token=1"]);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  handler(req, res);
});

server.listen(5000);
