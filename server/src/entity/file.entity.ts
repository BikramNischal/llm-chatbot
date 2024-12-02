import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    originalName: string

	@Column()
    name: string

	@Column()
	path: string;

    @Column({type:"date"})
    date: string; 
}
