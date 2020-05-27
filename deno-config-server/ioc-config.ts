import { resolve as gitResolve } from "./service/configuration-service-git.ts";
import { getConfigurationItems as urlResolve } from "./service/configuration-service-url.ts";
import { getConfigurationItems as mysqlResolve, getMysqlClient, GetMysqlClientFunction, ConnectionSettings } from "./service/configuration-service-mysql.ts";
import { handleConfigurationItemRequest } from "./middleware/resolve-item-middleware.ts";
import { config, cache } from "./config.ts";

// IOC definitions
function createGetMysqlClient(): GetMysqlClientFunction {
    return getMysqlClient.bind(null, config.mysql as ConnectionSettings);
}

export function createConfigurationService() {
    switch (config.store) {
        case "git":
            return gitResolve;
            break;
        case "url":
            return urlResolve.bind(null, config.url, cache);
            break;
        case "mysql":
            return mysqlResolve.bind(null, createGetMysqlClient());
            return
        default:
            throw new Error("error");
            break;
    }
}

export function createConfigurationItemMiddleware() {
    return handleConfigurationItemRequest.bind(null, createConfigurationService());
}