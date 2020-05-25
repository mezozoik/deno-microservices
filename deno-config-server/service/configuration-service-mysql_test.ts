import { assertEquals } from "./../test-deps.ts";
import { getConfigurationItems } from "./configuration-service-mysql.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";


Deno.test("find in db", async () => {
    let found = await getConfigurationItems(createFakeClient, ["first"]);
    assertEquals(found.length, 1);
});

Deno.test("empty db", async () => {
    let found = await getConfigurationItems(createFakeClientNoData, ["first"]);
    assertEquals(found.length, 0);
});


async function createFakeClientNoData() {
    return {
        query: function () {
            return [];
        },
        close: function () { }
    };
}

async function createFakeClient() {
    return {
        query: function () {
            return [
                { name: "first", value: "1" }
            ];
        },
        close: function () { }
    };
}