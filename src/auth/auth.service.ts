import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

	constructor(
		private UserService: UsersService,
		private jwtService: JwtService
	) {}

	async registration(dto: CreateUserDto) {
		const candidate = await this.UserService.getUserByEmail(dto.email);
		if (candidate) {
			console.log(candidate.email)
			throw new HttpException("Пользователь с таким email существует.", HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(dto.password, 5);
		const newUser = new User;
		newUser.email = dto.email
		newUser.name = dto.name
		newUser.password = hashPassword
		const user = await this.UserService.create(newUser)
		return this.generateToken(user)
	}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	async generateToken(user: User)  {
		const payLoad = {email: user.email, id: user.id}
		return {
			token: this.jwtService.sign(payLoad)
		}
	}

	private async validateUser(dto: CreateUserDto) {
		const user = await this.UserService.getUserByEmail(dto.email)
		const passwordEquals = await bcrypt.compare(dto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({message: "Неверный email или пароль."})
	}
}
