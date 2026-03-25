import { UrlShortHand } from "./entities/url.entity";
import { redisService } from "src/common/redis/redis.service";
import { Repository } from "typeorm";
import type { Queue } from 'bull';
export declare class UrlServices {
    private repo;
    private redis;
    private notificationQueue;
    constructor(repo: Repository<UrlShortHand>, redis: redisService, notificationQueue: Queue);
    createShortUrl(originalUrl: string): Promise<{
        short_url: string;
    }>;
    redirect(shortCode: string): Promise<string | null>;
}
