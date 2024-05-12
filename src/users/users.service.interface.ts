import { Group } from 'src/group/entities/group.entity'
import { User } from './entities/user.entity'

export interface IUsersService {
	findAll(): Promise<User[]>
	findUserGroups(id: number): Promise<Group[]>
  findOne(id: number): Promise<User>
  remove(id: number): Promise<void>
  create(file: User): Promise<User>
}