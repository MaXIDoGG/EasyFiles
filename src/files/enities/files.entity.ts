import { User } from 'src/auth/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  description: string;
	@Column()
  size: string;
	@ManyToOne(() => Group, (group) => group.files)
  group: Group;
  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
