
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

Single:

```shell
wget -qO- http://localhost:8080/configurationItem?name=first
```

```json
[
    {
        "name":"first",
        "value":{"a":1}
    }
]
```

Multiple:

```shell
wget -qO- http://localhost:8080/configurationItem?name=first,second
```

```json
[
    {
        "name":"first",
        "value":{"a":1}
    },
    {
        "name":"second",
        "value":{"b":2}
    }
]
```

## Config

```shell
vim ./config.ts
```
