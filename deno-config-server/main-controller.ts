import { Application, Router, Context } from "./deps.ts";
import  * as ioc from "./config.ts";

const app = new Application();

const router = new Router();
const routerMiddlewares = [
  {
    contextPath: "/configurationItem",
    middleware: ioc.createConfigurationItemMiddleware()
  }
];

routerMiddlewares.forEach((e) => {
  router.get(e.contextPath, async (c: Context) => {
    c.response.body = await e.middleware(c.request);
  });
});

app.use(router.routes()).use(router.allowedMethods());

await app.listen({ port: 8080 });