import { ConfigurationItem } from "./configuration-service.ts";
import { Cache } from "./../cache.ts"
import { log } from "./../deps.ts";

export async function getConfigurationItems(url: string, cache: Cache, names: string[]): Promise<ConfigurationItem[]> {
  log.debug("Looking for configuration item: ?", names);
  log.debug("Fetching configuration file from URL: ?", url);

  const cached = await cache.match([url, names].toString());
  if (cached !== undefined) {
    return cached as ConfigurationItem[];
  }

  if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) === null) {
    throw new Error("Invalid URL");
  }

  let items: ConfigurationItem[] | undefined;
  try {
    const content = await fetch(url);
    items = await content.json();
    log.debug("all loaded items: ?", items);
  } catch (e) {
    throw e;
  }

  const found = items?.filter(stored => names.find(e => e === stored.name));
  log.debug("found: ?", found);
  cache.put([url, names].toString(), found);
  return found ?? [];
}

