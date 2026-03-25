import { NotificationProcessor } from "./notification.preposser";
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

@Module({
    imports:[
        BullModule.registerQueue({
            name:"notifications"
        })
    ],

    providers:[NotificationProcessor]
})

export class NotificationModules{}