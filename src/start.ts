import {
  createCsrfMiddleware,
  createStart
} from "@tanstack/react-start";

// const redis = new Redis(process.env.REDIS_URL, {
//   enableOfflineQueue: false,
//   maxRetriesPerRequest: 1,
// });

// const limiter = new RateLimiterRedis({
//   storeClient: redis,
//   keyPrefix: "qna:global",
//   points: 60,
//   duration: 60,
//   rejectIfRedisNotReady: true,
// });

// const rateLimitMiddleware = createMiddleware().server(
//   async ({ request, next }) => {
//     if (request.method !== "GET" && request.method !== "POST") {
//       return next();
//     }

//     const ip =
//       request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
//       request.headers.get("x-real-ip") ??
//       "local";

//     try {
//       await limiter.consume(ip);
//     } catch (error) {
//       if (error instanceof Error) {
//         throw Response.json({ error: "Service unavailable" }, { status: 503 });
//       }

//       throw Response.json(
//         { error: "Too many requests" },
//         {
//           status: 429,
//         },
//       );
//     }

//     return next();
//   },
// );

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware] //[rateLimitMiddleware, ],
}));
