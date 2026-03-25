import { UrlShortHand } from "./entities/url.entity";
import { classValidator } from "./dto/create-dto-file";
import { Inject, Injectable,NotFoundException  } from "@nestjs/common";
import { redisService } from "src/common/redis/redis.service";
import { encodeBase62 } from "src/common/utility/generateId";
import {InjectRepository } from  "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationModules } from "../notifications/notification.module";
import { InjectQueue } from "@nestjs/bull";
import type {Queue} from 'bull';


export class UrlServices{
    constructor(@InjectRepository(UrlShortHand) private repo: Repository<UrlShortHand>,private redis:redisService,
     @InjectQueue('notification') private notificationQueue: Queue,
    ){}


        async createShortUrl(originalUrl: string) {
        const url = await this.repo.save({
        originalUrl,
        shortCode: '',
        });

        const shortCode  = await encodeBase62(url.urlId); 

        await this.repo.update(url.urlId, {shortCode});
        await this.notificationQueue.add('send-notification',{
            message:"ShortCode is created Successfully",
            shortCode
        });
        console.log("✅ Job added to queue");

        return {
            short_url:`http:localhost:3000/${shortCode}`
        };

    }
    async redirect(shortCode:string){
       const cacheKey = `url:${shortCode}`;
        const cached = this.redis.get(cacheKey);
        if (cached) return cached

        const url = await this.repo.findOne({where:{shortCode}});

        if (!url) throw new NotFoundException('URL not found');

        await this.redis.set(cacheKey , url.originalUrl, 3600);

            return url.originalUrl
       }

    }
