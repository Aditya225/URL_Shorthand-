"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlServices = void 0;
const url_entity_1 = require("./entities/url.entity");
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../common/redis/redis.service");
const generateId_1 = require("../../common/utility/generateId");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bull_1 = require("@nestjs/bull");
let UrlServices = class UrlServices {
    repo;
    redis;
    notificationQueue;
    constructor(repo, redis, notificationQueue) {
        this.repo = repo;
        this.redis = redis;
        this.notificationQueue = notificationQueue;
    }
    async createShortUrl(originalUrl) {
        const url = await this.repo.save({
            originalUrl,
            shortCode: '',
        });
        const shortCode = await (0, generateId_1.encodeBase62)(url.urlId);
        await this.repo.update(url.urlId, { shortCode });
        await this.notificationQueue.add('send-notification', {
            message: "ShortCode is created Successfully",
            shortCode
        });
        console.log("✅ Job added to queue");
        return {
            short_url: `http:localhost:3000/${shortCode}`
        };
    }
    async redirect(shortCode) {
        const cacheKey = `url:${shortCode}`;
        const cached = this.redis.get(cacheKey);
        if (cached)
            return cached;
        const url = await this.repo.findOne({ where: { shortCode } });
        if (!url)
            throw new common_1.NotFoundException('URL not found');
        await this.redis.set(cacheKey, url.originalUrl, 3600);
        return url.originalUrl;
    }
};
exports.UrlServices = UrlServices;
exports.UrlServices = UrlServices = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(url_entity_1.UrlShortHand)),
    __param(2, (0, bull_1.InjectQueue)('notification')),
    __metadata("design:paramtypes", [typeorm_2.Repository, redis_service_1.redisService, Object])
], UrlServices);
//# sourceMappingURL=url.service.js.map