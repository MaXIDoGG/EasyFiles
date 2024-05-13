import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './enities/files.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
