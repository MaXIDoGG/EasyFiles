import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './enities/files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
	constructor(
    @InjectRepository(FileEntity)
    private FilesRepository: Repository<FileEntity>,
  ) {}
	findAll(): Promise<FileEntity[]> {
    return this.FilesRepository.find();
  }
  findOne(id: number): Promise<FileEntity> {
    return this.FilesRepository.findOneBy({id: id});
  }
  async remove(id: number): Promise<void> {
    await this.FilesRepository.delete(id);
  }


	// uploadFile() {
		
	// }
}
