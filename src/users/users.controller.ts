import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersService } from './Users.service.interface';

@Controller('users')
export class UsersController {
	constructor(
    @Inject(UsersService)
    private _usersService: IUsersService
  ){}

	async createUser() {
		
	}
	
	
}
