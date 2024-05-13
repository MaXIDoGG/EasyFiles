import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('registration')
	@ApiOperation({summary: 'Регистрация'})
	async registration(@Body() dto: CreateUserDto) {
		return this.authService.registration(dto);
	}

	@Post('login')
	@ApiOperation({summary: 'Авторизация'})
	async login(@Body() dto: CreateUserDto) {
		return this.authService.login(dto)
	}
}
