import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { IUsersService } from './users.service.interface';
import { User } from './entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { FileEntity } from 'src/files/enities/files.entity';

@Injectable()
export class UsersService implements IUsersService {
	constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}
	findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }
	async findUserGroups(userId: number): Promise<Group[]> {
		let user = await this.UsersRepository.findOne({where: {id: userId}, relations: { groups: true }});
    console.log(user)
    console.log(1235);
		return user ? user.groups : null;
	}

	async findUserFiles(userId: number): Promise<FileEntity[]> {
		let user = await this.UsersRepository.findOne({where: {id: userId}, relations: { files: true }});
		return user.files;
	}

  findOne(id: number): Promise<User> {
    return this.UsersRepository.findOneBy({id: id});
  }
  async remove(id: number): Promise<void> {
    await this.UsersRepository.delete(id);
  }
  async create(User: User): Promise<User> {
    const newUser = this.UsersRepository.create(User)
    return await this.UsersRepository.save(newUser)
  }

  async getUserByEmail(email: string): Promise<User> {
    console.log(email)
    return this.UsersRepository.findOneBy({email: email})
  }
}
