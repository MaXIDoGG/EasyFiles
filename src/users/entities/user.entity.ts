import { FileEntity } from 'src/files/enities/files.entity';
import { Group } from 'src/group/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
	@ManyToMany(() => Group, (group) => group.users)
  // @JoinTable()
  groups: Group[];
	@OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];
}
