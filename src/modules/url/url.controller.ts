import { Controller,Get, Post,Body, Param,Res } from "@nestjs/common";
import { UrlServices } from "./url.service";
import { classValidator } from "./dto/create-dto-file";
import { Response } from 'express';
@Controller("shorten")

export class UrlController{
    constructor(private urlService:UrlServices){}

    @Post('create')
    async create(@Body() dto:classValidator){
        return this.urlService.createShortUrl(dto.originalUrl)
    }
    
    // @Get(":shortCode")
    // async redirect(@Param('shortCode') shortCode:string, @Res() res:Response){
    //    const url = await this.urlService.redirect(shortCode)
    //      return res.redirect(url);
    // }

    @Get(':shortCode')
    async redirect(@Param('shortCode') shortCode: string) {
        const url = await this.urlService.redirect(shortCode);
        return {url}
  }
}