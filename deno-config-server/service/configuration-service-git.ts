import { ConfigurationItem } from "./configuration-service.ts";
export function resolve(name : string) : ConfigurationItem {
    return {name : "from git", value : {a : "from-git-value"}};
}