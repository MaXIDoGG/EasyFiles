import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: string;
  @Column()
  original_name: string;
	@Column()
  size: number;
	@ManyToOne(() => Group, (group) => group.files, {nullable: true})
  group: Group;
  @ManyToOne(() => User, (user) => user.files, {nullable: true})
  user: User;
}
