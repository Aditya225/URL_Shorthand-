import { UrlServices } from "./url.service";
import { UrlController } from "./url.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { redisService } from "src/common/redis/redis.service";
import { UrlShortHand } from "./entities/url.entity";
import { BullModule } from "@nestjs/bull";

@Module({
    imports:[TypeOrmModule.forFeature([UrlShortHand]),
   BullModule.registerQueue({
    name:"notification"
   })
],
    controllers:[UrlController],
    providers:[UrlServices,redisService]
})

export class UrlModules{

}