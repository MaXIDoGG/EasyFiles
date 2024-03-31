import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';

@Injectable()
export class FilesService {
	async saveFiles(file: Express.Multer.File): Promise<FileElementResponse[]> {

	}
}
