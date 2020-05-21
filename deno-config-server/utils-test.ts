import { assertEquals } from "./test-deps.ts";
import { getPort } from "./utils.ts"

Deno.test("test getPort", () => {
  assertEquals(getPort([]), "8080");
  assertEquals(getPort(["test"]), "8080");
  assertEquals(getPort(["-port"]), "8080");

  assertEquals(getPort(["-port=8081"]), "8081");
  assertEquals(getPort(["-port1", "-port = 8081"]), "8081");
  assertEquals(getPort(["p1=v1", "-port=8081", "p2=v2"]), "8081");
});
