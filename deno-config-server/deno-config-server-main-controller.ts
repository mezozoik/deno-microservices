import { Application, Router, Context } from "./deps.ts";
import * as ioc from "./config.ts";
import { getPort } from "./utils.ts";
import { Sha1 } from "https://deno.land/std/hash/sha1.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";


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
    let response = await e.middleware(c.request);
    const etag: string = new Sha1().update(response.toString()).toString();
    let ifNoneMatch = c.request.headers.get("If-None-Match");
    c.response.headers.set("ETag", etag);
    if (ifNoneMatch !== null && ifNoneMatch === etag) {
      console.log("If-None-Match header detected - check ETag");
      c.response.status = Status.NotModified;
    } else {
      c.response.body = response;
    }
  });
});

app.use(router.routes()).use(router.allowedMethods());

let port = getPort(Deno.args);
console.log("Deno config server running on port: %s", port);
await app.listen({ port: port });
