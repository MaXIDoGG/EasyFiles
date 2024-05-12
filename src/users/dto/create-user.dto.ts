import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    // @IsString({message: 'Должно быть строкой'})
    // @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'пароль'})
    // @IsString({message: 'Должно быть строкой'})
    // @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    // @IsString({message: 'Должно быть строкой'})
    // @Length(2, 32, {message: 'Не меньше 2 и не больше 32'})
    name: string;
}