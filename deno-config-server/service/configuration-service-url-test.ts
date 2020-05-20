import { assertEquals, assertThrows } from "./../test-deps.ts";
import { resolve } from "./configuration-service-url.ts";

// Deno.test("google.com is not valid json/deno-configuration-file", () => {
//     assertThrows(async () => await resolve("http://www.google.com", "test"));
// });

Deno.test("parse right test configuration file", async () => {
    await resolve("https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json", "first_test_config_param");
});

