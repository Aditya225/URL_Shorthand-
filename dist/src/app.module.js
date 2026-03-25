"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const url_module_1 = require("./modules/url/url.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const bull_1 = require("@nestjs/bull");
const notification_module_1 = require("./modules/notifications/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: "postgresql://neondb_owner:npg_3gufFp0GwLVh@ep-shiny-sound-an1ji73m-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
                autoLoadEntities: true,
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            url_module_1.UrlModules,
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 6000,
                    limit: 10,
                }
            ]),
            bull_1.BullModule.forRoot({
                redis: {
                    host: '127.0.0.1',
                    port: 6379
                }
            }),
            notification_module_1.NotificationModules
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map