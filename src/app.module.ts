import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, FilesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
