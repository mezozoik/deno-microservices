import { ConfigurationItem } from "./configuration-service.ts";
import { Cache } from "./../cache.ts"

export async function getConfigurationItems(url: string, cache : Cache, names: string[]): Promise<ConfigurationItem[]> {
    return new Promise<ConfigurationItem[]>(async (resolve, reject) => {
        console.log("Looking for configuration item: %s", names);
        console.log("Fetching configuration file from URL: %s", url);

        const cached = cache.match([url, names]);
        if (cached !== undefined) {
          resolve(cached);
          return;
        }

        if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) === null) {
          reject (new Error("Invalid URL"));
        }
      
        let items : ConfigurationItem[] | undefined;
        try {
          const content = await fetch(url);
          items = await content.json();
          console.log(items);
        } catch (e) {
          reject(e);
          return;
        }

        const found = items?.filter(stored => names.find(e => e === stored.name));
        console.log("found: %o", found)
        cache.put([url, names], found);
        resolve(found);
      });
}

