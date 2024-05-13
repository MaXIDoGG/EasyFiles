import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateGroupDto {

    @ApiProperty({example: 'Моя группа', description: 'Название группы'})
    // @IsString({message: 'Должно быть строкой'})
    // @IsEmail({}, {message: "Некорректный email"})
    readonly title: string;

    @ApiProperty({example: 'Моя любимая группа друзей', description: 'Описание группы'})
    // @IsString({message: 'Должно быть строкой'})
    // @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly description: string;
}