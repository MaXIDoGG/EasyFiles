import { Module, forwardRef } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './enities/files.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    forwardRef(() => GroupModule),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([FileEntity]),
    JwtModule.register({
      secret: "secret", // TODO: Добавить переменную окружения
      signOptions: {
        expiresIn: '48h'
      }
    })
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
