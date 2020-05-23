import { assertEquals } from "./test-deps.ts";
import { Cache } from "./cache.ts";

// Deno.test("cache test basic", async () => {
//     const cache = new Cache();
    
//     assertEquals(await cache.match("test"), undefined);
//     assertEquals(await cache.match(1), undefined);

//     cache.put(1, "test");
//     assertEquals(await cache.match(1), "test");
//     assertEquals(await cache.match(2), undefined);
// });


Deno.test("cache test size", async () => {
    const cache = new Cache(2);
    cache.put(1, "one");
    await cache.match(1);

    cache.put(2, "two");
    await cache.match(2);
    await cache.match(2);

    cache.put(3, "three");
    // lu (1) should have been deleted from cache
    assertEquals(await cache.match(1), undefined);
});
