import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './files/enities/files.entity';
import { User } from './auth/entities/user.entity';
import { Group } from './group/entities/group.entity';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    GroupModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'easy_files',
      entities: [FileEntity, User, Group],
      synchronize: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
