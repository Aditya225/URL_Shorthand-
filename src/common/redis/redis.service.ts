import Redis from "ioredis";
import { Injectable } from "@nestjs/common";


export class redisService{
    private client:Redis;
    constructor(){
      this.client = new Redis({
        host:"127.0.0.1",
        port:6379

      })
    this.client.on("error",(err)=>{
        console.log("error", err);
    });
    this.client.on('connect',()=>{
        console.log("connected");
    })
    }
    

  
    async get(key:string){
       return  this.client.get(key);
    }

    async set(key:string, value:string, till:number){
        return this.client.set(key,value, "EX",till)
    }

}