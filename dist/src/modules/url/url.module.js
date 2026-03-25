"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModules = void 0;
const url_service_1 = require("./url.service");
const url_controller_1 = require("./url.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const redis_service_1 = require("../../common/redis/redis.service");
const url_entity_1 = require("./entities/url.entity");
const bull_1 = require("@nestjs/bull");
let UrlModules = class UrlModules {
};
exports.UrlModules = UrlModules;
exports.UrlModules = UrlModules = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([url_entity_1.UrlShortHand]),
            bull_1.BullModule.registerQueue({
                name: "notification"
            })
        ],
        controllers: [url_controller_1.UrlController],
        providers: [url_service_1.UrlServices, redis_service_1.redisService]
    })
], UrlModules);
//# sourceMappingURL=url.module.js.map