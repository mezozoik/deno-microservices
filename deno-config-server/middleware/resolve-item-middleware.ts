import { Request } from "./../deps.ts";
import { ConfigurationItem } from "./../service/configuration-service.ts";

export async function handleConfigurationItemRequest(getConfigItems : any, request : Request) : Promise<ConfigurationItem[]> {
    return new Promise<ConfigurationItem[]>((resolve, reject) => {
        let names = request.url.searchParams.get("name")?.split(",");
        resolve(getConfigItems(names));
    });

}