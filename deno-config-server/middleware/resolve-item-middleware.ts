import { Request } from "./../deps.ts";
import { ConfigurationItem } from "./../service/configuration-service.ts";

export async function handleConfigurationItemRequest(configurationService : any, request : Request) : Promise<ConfigurationItem> {

    return new Promise<ConfigurationItem>((resolve, reject) => {
        let name = request.url.searchParams.get("name");
        resolve(configurationService(name));
    });

}