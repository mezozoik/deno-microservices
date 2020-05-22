import { assertEquals } from "./../test-deps.ts";
import { getConfigurationItems } from "./configuration-service-url.ts";

Deno.test("google.com is not valid json/deno-configuration-file", async () => {
    try {
        await getConfigurationItems("http://www.google.com", ["test"]);
    } catch (e) {
        console.log(e);
    }
});

Deno.test("load configuration file - invalid url", async () => {
    try {
        await getConfigurationItems("invalid_url", ["test"]);
    } catch (e) {
        console.log(e);
    }
});

Deno.test("parse right test configuration file", async () => {
    const items = await getConfigurationItems("https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json", ["first"]);
    assertEquals(items.length, 1);
});

Deno.test("multiple config items", async () => {
    const items = await getConfigurationItems("https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json", 
    ["first", "second"]);
    assertEquals(items.length, 2);
});


