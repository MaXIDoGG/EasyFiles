import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { FileEntity } from 'src/files/enities/files.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupService {
	constructor(
    @InjectRepository(Group)
    private GroupRepository: Repository<Group>,
  ) {}
	findAll(): Promise<Group[]> {
    return this.GroupRepository.find();
  }
  findOne(id: number): Promise<Group> {
    return this.GroupRepository.findOneBy({id: id});
  }
  async remove(id: number): Promise<void> {
    await this.GroupRepository.delete(id);
  }
  async create(group: Group): Promise<Group> {
    const newGroup = this.GroupRepository.create(group)
    return await this.GroupRepository.save(newGroup)
  }

	async addFile(groupId: number, file: FileEntity): Promise<Group> {
		const group = await this.findOne(groupId)
		group.files.push(file)
		return await this.GroupRepository.save(group)
	}

	async addUser(groupId: number, user: User): Promise<Group> {
		const group = await this.findOne(groupId)
		group.users = [user]
		return await this.GroupRepository.save(group)
	}

  async getUsers(groupId: number): Promise<User[]> {
    const group = await this.GroupRepository.findOne({where: {id: groupId}, relations: ['users']})
    console.log(group)
    console.log(group.users)
    console.log(1234)
    return group.users
  }
}
