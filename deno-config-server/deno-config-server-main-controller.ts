import { Application, Router, Context } from "./deps.ts";
import  * as ioc from "./config.ts";
import { getPort } from "./utils.ts";


const app = new Application();

const router = new Router();
const routerMiddlewareList = [
  {
    contextPath: "/configurationItem",
    middleware: ioc.createConfigurationItemMiddleware()
  }
];

routerMiddlewareList.forEach((e) => {
  router.get(e.contextPath, async (c: Context) => {
    c.response.body = await e.middleware(c.request);
  });
});

app.use(router.routes()).use(router.allowedMethods());

let port = getPort(Deno.args);
console.log("Deno config server running on port: %s", port);
await app.listen({ port: port });
