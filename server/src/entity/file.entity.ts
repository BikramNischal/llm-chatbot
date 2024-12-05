import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class File {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
    originalName: string

	@Column()
    name: string

	@Column()
	path: string;

    @Column({type:"date"})
    date: string; 
}