
# External configuration server

- REST API
- configuration stores (git, sql, nosql, file, ...)

## Run

```shell
# with default port 8080
deno run --allow-net ./deno-config-server-main-controller.ts

# with defined port
deno run --allow-net ./deno-config-server-main-controller.ts -port=8081
```

## Try

Retrieve configuration item (like in a client application):

```shell
wget -qO- http://localhost:8080/configurationItem?name=first_test_config_param
```

Output

```json
{"name":"first_test_config_param","value":{"a":1}}
```

## Config

```shell
vim ./config.ts
```
