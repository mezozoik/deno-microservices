export class Cache {

    private valueMap = new Map();
    private usingMap = new Map<any, number>();

    constructor(private size : number = 100) { }

    public async match (key : any) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            console.log("checking cache for key: %o", key);
            if (this.valueMap.has(key)) {
                const value = this.valueMap.get(key);
                this.usingMap.set(key, (this.usingMap.get(key) ?? 0) + 1);
                console.log("cache hit for key: %o, with value: %o", key, value)
                resolve(value);
            }
        });
    }

    public put (key : any, value : any) {
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

        this.valueMap.set(key, value);
        this.usingMap.set(key, 0);
    }

}