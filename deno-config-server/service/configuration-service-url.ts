import { ConfigurationItem } from "./configuration-service.ts";

export async function resolve(
  url: string,
  name: String
): Promise<ConfigurationItem> {
    return new Promise<ConfigurationItem>( async (resolve, reject) => {
        console.log("Looking for configuration item: %s", name);
        console.log("Fetching configuration file from URL: %s", url);
        if (
          url.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          ) === null
        ) {
          console.error("Invalid URL: %s", url);
          reject (new Error("Invalid URL"));
        }
      
        try {
          const content = await fetch(url);
          let items : ConfigurationItem[] = await content.json();
          console.log(items);

          let found = items.find(e => {return e.name == name});
          console.log("found: %o", found)

          resolve(found);
        } catch (e) {
          reject(e);
        }
      });
}

