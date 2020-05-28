import { log } from "./global-deps.ts";

// logger
await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("DEBUG", {
            formatter: (logRecord) => {
                let msg = logRecord.msg;
                let input;
                logRecord.args.forEach(e => {
                    switch (typeof e) {
                        case "string":
                            input = e;
                            break;
                        case "number":
                            input = (e as number).toString();
                            break
                        default:
                            input = JSON.stringify(e);
                            break;
                    }
                    msg = msg.replace("?", input);
                });
                return `${logRecord.datetime.toISOString()} [${logRecord.levelName}]: ${msg}`;
            }
        })
    },

    loggers: {
        // configure default logger available via short-hand methods above
        default: {
            level: "DEBUG",
            handlers: ["console"]
        }
    }
});