import { Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersService } from './users.service.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileEntity } from 'src/files/enities/files.entity';
import { Group } from 'src/group/entities/group.entity';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(
    @Inject(UsersService)
    private _usersService: UsersService
  ){}


	@ApiOperation({summary: 'Получить пользователя по ID'})
	@UseGuards(JwtAuthGuard)
	@Get("getUserById/:id")
	async getUserById(@Param('id') id: number): Promise<User> {
		return this._usersService.findOne(id)
	}
	
	@ApiOperation({summary: 'Получить всех пользователей'})
	@UseGuards(JwtAuthGuard)
	@Get("getAllUsers")
	async getAllUsers(): Promise<User[]> {
		return this._usersService.findAll()
	}

	@ApiOperation({summary: 'Получить все файлы пользователя по его ID'})
	@UseGuards(JwtAuthGuard)
	@Get("getUserFilesById")
	async getUserFilesById(@Param('id') id: number): Promise<FileEntity[]> {
		const files = await this._usersService.findUserFiles(id)
		return files
	}

	@ApiOperation({summary: 'Получить все группы пользователя по его ID'})
	@UseGuards(JwtAuthGuard)
	@Get("getUserGroupsById")
	async getUserGroupsById(@Param('id') id: number): Promise<Group[]> {
		const groups = await this._usersService.findUserGroups(id)
		return groups
	}
}
