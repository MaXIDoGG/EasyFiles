import { Controller, Get, Header, HttpStatus, Inject, Param, Post, Res, Response, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FilesService } from './files.service';
import { FileEntity } from './enities/files.entity';
import { Response as expRes } from 'express' ;
import { createReadStream } from 'fs';
import { IFilesService } from './files.service.interface';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(FilesService)
    private _filesService: IFilesService
  ){}

  @Get("getFilesByGroup/:id")
  async getFilesByGroup() {}

  @Get("getFileById/:id")
	async getFileById(@Param('id') id: number): Promise<FileEntity>{
    const fileColumn = await this._filesService.findOne(id)
    
    return fileColumn

	}

	@Get("downloadById/:id")
	async downloadById(@Param('id') id: number, @Response({passthrough: true}) res: expRes): Promise<StreamableFile>{
    const fileColumn = await this._filesService.findOne(id)
    const file = createReadStream(join(process.cwd() + '/uploads', fileColumn.name));

    res.set({
      'Content-Type': fileColumn.type,
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Disposition': `attachment; filename=${fileColumn.original_name}`,
      'Access-Control-Allow-Origin': "*"
    })
    return new StreamableFile(file);
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
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<HttpStatus> {
    console.log(file);
    const newFile = new FileEntity()
    newFile.name = file.filename
    newFile.original_name = file.originalname
    newFile.type = file.mimetype
    newFile.size = file.size
    await this._filesService.create(newFile)
    return HttpStatus.CREATED
	}
	
}
