import { Request } from "./../deps.ts";
import { ConfigurationItem } from "./../service/configuration-service.ts";

export async function handleConfigurationItemRequest(getConfigItems : any, request : Request) : Promise<ConfigurationItem[]> {
    let names = request.url.searchParams.get("name")?.split(",");
    return getConfigItems(names);
}