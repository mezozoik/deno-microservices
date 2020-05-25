import { ConfigurationItem } from "./configuration-service.ts";
import { Cache } from "./../cache.ts"

export async function getConfigurationItems(url: string, cache: Cache, names: string[]): Promise<ConfigurationItem[]> {
  console.log("Looking for configuration item: %s", names);
  console.log("Fetching configuration file from URL: %s", url);

  const cached = await cache.match([url, names]);
  if (cached !== undefined) {
    return cached;
  }

  if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) === null) {
    throw new Error("Invalid URL");
  }

  let items: ConfigurationItem[] | undefined;
  try {
    const content = await fetch(url);
    items = await content.json();
    console.log(items);
  } catch (e) {
    throw e;
  }

  const found = items?.filter(stored => names.find(e => e === stored.name));
  console.log("found: %o", found)
  cache.put([url, names], found);
  return found ?? [];
}

