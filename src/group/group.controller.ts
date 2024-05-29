import { Controller, Get, Post, Inject, Param, Body, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Группы')
@ApiBearerAuth()
@Controller('group')
export class GroupController {
	constructor(
    @Inject(GroupService)
    private _groupService: GroupService,
		@Inject(UsersService)
		private _usersService: UsersService
  ){}

	@UseGuards(JwtAuthGuard)
	@Post("createGroup")
	@ApiOperation({summary: 'Создать группу'})
	async createGroup(@Req() req, @Body() groupDto: CreateGroupDto): Promise<Group> {
		let newGroup = new Group()
		newGroup.title = groupDto.title
		newGroup.description = groupDto.description
		console.log(req.user.email)
		const user = await this._usersService.getUserByEmail(req.user.email)
		
		// console.log(user)
		// newGroup.users.push(user)
		newGroup = await this._groupService.create(newGroup)
		newGroup = await this._groupService.addUser(newGroup.id, user)
		return newGroup
	}

	@UseGuards(JwtAuthGuard)
  @Get("getGroupById/:id")
	@ApiOperation({summary: 'Получить группу по ID'})
	async getGroupById(@Param('id') id: number): Promise<Group>{
    return this._groupService.findOne(id)
	}

	@UseGuards(JwtAuthGuard)
  @Get("getGroupUsersById/:id")
	@ApiOperation({summary: 'Получить участников по ID группы'})
	async getGroupUsersById(@Param('id') id: number): Promise<User[]>{
    return this._groupService.getUsers(id)	
	}

}
