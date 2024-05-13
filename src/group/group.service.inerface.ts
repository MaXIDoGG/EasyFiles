import { Group } from './entities/group.entity'

export interface IGroupService {
	findAll(): Promise<Group[]>
  findOne(id: number): Promise<Group>
  remove(id: number): Promise<void>
  create(file: Group): Promise<Group>
}