import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from "typeorm"

import { Ingest } from "./ingest.entity";


@Entity()
export class Chat{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToOne(()=> Ingest, {nullable: true})
    @JoinColumn()
    ingest: Ingest | null;

    @Column()
    token: number; 
}