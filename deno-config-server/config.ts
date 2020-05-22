import { resolve as gitResolve} from "./service/configuration-service-git.ts";
import { getConfigurationItems as urlResolve} from "./service/configuration-service-url.ts";
import { getConfigurationItems as mysqlResolve, getMysqlConnection} from "./service/configuration-service-mysql.ts";
import { handleConfigurationItemRequest } from "./middleware/resolve-item-middleware.ts";


let c = `
            {
                "store": "mysql",
                "mysql": {
                    "hostname": "127.0.0.1",
                    "username": "root",
                    "db": "configuration",
                    "password": ""
                },
                "url": "https://raw.githubusercontent.com/mezozoik/deno-microservices/master/deno-config-server/test/test-configuration.json"
            }
`;
let config = JSON.parse(c);

console.log("Config loaded: %o", config);

function createGetMysqlConnection() {
    return getMysqlConnection.bind(null, config.mysql);
}

export function createConfigurationService() {
    switch (config.store) {
        case "git":
            return gitResolve;
            break;
        case "url":
            return urlResolve.bind(null, config.url);
            break;
        case "mysql":
            return mysqlResolve.bind(null, createGetMysqlConnection());
            return 
        default:
            throw new Error("error");
            break;
    }
}

export function createConfigurationItemMiddleware() {
    return handleConfigurationItemRequest.bind(null, createConfigurationService());
}


