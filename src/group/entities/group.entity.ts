import { User } from 'src/auth/entities/user.entity';
import { FileEntity } from 'src/files/enities/files.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
	@OneToMany(() => FileEntity, (file) => file.group)
  files: FileEntity[];
  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
