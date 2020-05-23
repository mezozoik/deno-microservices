import { Sha1 } from "https://deno.land/std/hash/sha1.ts";

export class Cache {

    private valueMap = new Map();
    private usingMap = new Map<any, number>();

    constructor(private size : number = 100) { }

    public async match (key : any) : Promise<any> {

        return new Promise<any> ((resolve, reject) => {
            let stringKey = new Sha1().update(key.toString()).toString();

            console.log("checking cache for key: %o", stringKey);
            if (this.valueMap.has(stringKey)) {
                const value = this.valueMap.get(stringKey);
                this.usingMap.set(stringKey, (this.usingMap.get(key) ?? 0) + 1);
                console.log("cache hit for key: %o, with value: %o", stringKey, value)
                resolve(value);
            }
            resolve(undefined);
        });
    }

    public put (key : any, value : any) {

        const stringKey = new Sha1().update(key.toString()).toString();

        // todo: shrink in batch
        if (this.valueMap.size >= this.size) {
            let minValue : number;
            let minKey : any;
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