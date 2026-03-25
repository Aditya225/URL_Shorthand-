export declare class redisService {
    private client;
    constructor();
    get(key: string): Promise<string | null>;
    set(key: string, value: string, till: number): Promise<"OK">;
}
