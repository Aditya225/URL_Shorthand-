import {Processor, Process} from "@nestjs/bull";

@Processor('notification')

export class NotificationProcessor{
    @Process('send-notification')
    async handleNotification(job:any){
        console.log("line 8", job.data)
        
    }
}
