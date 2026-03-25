import {isNumber, isDate, IsUrl } from "class-validator";

export class classValidator{

    @IsUrl()
    originalUrl:string
 
}