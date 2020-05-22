import { assertEquals } from "./../test-deps.ts";
import { resolve } from "./configuration-service-url.ts";

Deno.test("google.com is not valid json/deno-configuration-file", async () => {
    try {
        await resolve("http://www.google.com", "test");
    } catch (e) {
        console.log(e);
    }
});

Deno.test("parse right test configuration file", async () => {
    await resolve("https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json", "first_test_config_param");
});

