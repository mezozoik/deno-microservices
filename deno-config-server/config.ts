import { resolve as gitresolve} from "./service/configuration-service-git.ts";
import { resolve as urlresolve} from "./service/configuration-service-url.ts";
import { handleConfigurationItemRequest } from "./middleware/resolve-item-middleware.ts";

enum ConfigStor {
    GIT,
    PostgreSQL,
    URL
}

let config = {
    store: ConfigStor.URL,
    url : "https://github.com/mezozoik/deno-microservices/tree/master/deno-config-server/test/test-configuration.json"
}

console.log("Config loaded: %o", config);

export function createConfigurationService() {
    switch (config.store) {
        case ConfigStor.GIT:
            return gitresolve;
            break;
        case ConfigStor.URL:
            return urlresolve;
        default:
            throw new Error("error");
            break;
    }
}

export function createConfigurationItemMiddleware() {
    return handleConfigurationItemRequest.bind(null, createConfigurationService());
}


