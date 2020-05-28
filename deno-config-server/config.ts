import "./../global-config.ts";
import { Cache } from "./cache.ts";
import { log } from "./deps.ts";

let c = `
            {
                "store": "url",
                "mysql": {
                    "hostname": "127.0.0.1",
                    "username": "root",
                    "db": "configuration",
                    "password": ""
                },
                "url": "https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json",
                "cacheSize" : 100
            }
`;

// global singletons
export const config = JSON.parse(c);
export const cache = new Cache(config.cacheSize ?? 100);

log.debug("Config loaded: ?", config);