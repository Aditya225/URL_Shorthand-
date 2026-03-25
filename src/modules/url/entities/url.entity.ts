import {Entity, Column, PrimaryGeneratedColumn,Index, CreateDateColumn} from "typeorm";

@Entity("UrlShortHand")
export class UrlShortHand{
    @PrimaryGeneratedColumn()
    urlId:number

    @Column()
    originalUrl:string

    @Index()
    @Column({unique:true})
    shortCode:string

    @CreateDateColumn()
    createdAt:Date

}