import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	Column,
	JoinTable,
} from "typeorm";

import { File } from "./file.entity";

@Entity()
export class Ingest {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: true })
	chat: string | null;

	@ManyToMany(() => File)
	@JoinTable()
	files: File[];
}
