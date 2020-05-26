import { ConfigurationItem } from "./configuration-service.ts";
import { Client as MySqlClient } from "https://deno.land/x/mysql/mod.ts";

export type GetMysqlClientFunction = (connection?: object) => MySqlClient | object;
export interface ConnectionSettings {
    hostname: string,
    username: string,
    db: string,
    password: string
};

export async function getConfigurationItems(getMysqlConnectionFunction: GetMysqlClientFunction, names: string[]): Promise<ConfigurationItem[]> {
    console.log("looking for configuration items: %o", names);
    const client = await <MySqlClient>getMysqlConnectionFunction();
    const response = await client.query("select * from config_items where name IN (?)", [names]);

    console.log("found: %o", response);
    await client.close();
    return response;

}

export async function getMysqlClient(connection: ConnectionSettings): Promise<MySqlClient> {
    return await new MySqlClient().connect(connection);
}
