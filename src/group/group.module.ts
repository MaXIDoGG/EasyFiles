import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Group } from './entities/group.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Group]),
    JwtModule.register({
      secret: "secret", // TODO: Добавить переменную окружения
      signOptions: {
        expiresIn: '48h'
      }
    })
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
