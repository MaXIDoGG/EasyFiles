import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {

	@Get("getFileById")
	getFileById(@Param('id') id: string) {

	}

	@Post("uploadFile")
	@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
		filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}))
	@ApiBody({
		schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
	})
	@ApiConsumes('multipart/form-data')
	uploadFile(@UploadedFile() file: Express.Multer.File) {
  	console.log(file);
	}
	
}
