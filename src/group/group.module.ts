import { Module, forwardRef } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Group } from './entities/group.entity';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => FilesModule),
    TypeOrmModule.forFeature([Group]),
    JwtModule.register({
      secret: "secret", // TODO: Добавить переменную окружения
      signOptions: {
        expiresIn: '48h'
      }
    })
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [
    GroupService
  ]
})
export class GroupModule {}
