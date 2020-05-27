import { Sha1 } from "https://deno.land/std/hash/sha1.ts";
import { log } from "./deps.ts";

export class Cache {

    private valueMap = new Map();
    private usingMap = new Map<string, number>();

    constructor(private size: number = 100) { }

    async match(key: string): Promise<unknown> {
        let stringKey = new Sha1().update(key).toString();

        log.debug(`checking cache for key: ${stringKey}`);
        if (this.valueMap.has(stringKey)) {
            const value = this.valueMap.get(stringKey);
            this.usingMap.set(stringKey, (this.usingMap.get(key) ?? 0) + 1);
            log.debug(`cache hit for key: ${stringKey}, with value: ${value}`);
            return value;
        }
        return undefined;
    }

    put(key: string, value: unknown) {

        const stringKey = new Sha1().update(key).toString();

        // todo: shrink in batch
        if (this.valueMap.size >= this.size) {
            let minValue: number;
            let minKey: any;
            const lu = this.usingMap.forEach((value, key) => {
                if (minValue === undefined) {
                    minValue = value;
                    minKey = key;
                }
                if (minValue > value) {
                    minValue = value;
                    minKey = key;
                }
            });
            this.valueMap.delete(minKey);
        }

        this.valueMap.set(stringKey, value);
        this.usingMap.set(stringKey, 0);
    }

}