import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlModules } from './modules/url/url.module';
import { ThrottleConfig } from 'rxjs';
import { ThrottlerGuard,ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { NotificationModules } from './modules/notifications/notification.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: "postgresql://neondb_owner:npg_3gufFp0GwLVh@ep-shiny-sound-an1ji73m-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require", // 🔥 Neon URL
    autoLoadEntities: true,
    synchronize: true, // dev only
    ssl: {
      rejectUnauthorized: false, // 🔥 IMPORTANT for Neon
    },

}),
  UrlModules,
 ThrottlerModule.forRoot([
  {
      ttl:6000,
      limit: 10,
    }
 ]),
    BullModule.forRoot({
      redis:{
        host:'127.0.0.1',
        port:6379
      }
    }),
    NotificationModules
],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }],
})
export class AppModule {}



