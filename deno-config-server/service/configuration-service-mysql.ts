import { ConfigurationItem } from "./configuration-service.ts";
import { Client as MySqlClient } from "https://deno.land/x/mysql/mod.ts";
import { log } from "./../deps.ts";

export type GetMysqlClientFunction = (connection?: object) => MySqlClient | object;
export interface ConnectionSettings {
    hostname: string,
    username: string,
    db: string,
    password: string
};

export async function getConfigurationItems(getMysqlConnectionFunction: GetMysqlClientFunction, names: string[]): Promise<ConfigurationItem[]> {
    log.debug("looking for configuration items: ?", names);
    const client = await <MySqlClient>getMysqlConnectionFunction();
    const response = await client.query("select * from config_items where name IN (?)", [names]);

    log.debug("found: ?", response);
    await client.close();
    return response;

}

export async function getMysqlClient(connection: ConnectionSettings): Promise<MySqlClient> {
    return await new MySqlClient().connect(connection);
}
