"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class redisService {
    client;
    constructor() {
        this.client = new ioredis_1.default({
            host: "127.0.0.1",
            port: 6379
        });
        this.client.on("error", (err) => {
            console.log("error", err);
        });
        this.client.on('connect', () => {
            console.log("connected");
        });
    }
    async get(key) {
        return this.client.get(key);
    }
    async set(key, value, till) {
        return this.client.set(key, value, "EX", till);
    }
}
exports.redisService = redisService;
//# sourceMappingURL=redis.service.js.map