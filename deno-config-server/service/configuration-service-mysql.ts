import { ConfigurationItem } from "./configuration-service.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

export async function getConfigurationItems(getMysqlConnectionFunction: Function, names: string[]): Promise<ConfigurationItem[]> {
    console.log("looking for configuration items: %o", names);
    const client = await <Client>getMysqlConnectionFunction();
    const response = await client.query("select * from config_items where name IN (?)", [names]);

    console.log("found: %o", response);
    await client.close();
    return response;

}

export async function getMysqlConnection(connection: object) {
    return await new Client().connect(connection);
}
