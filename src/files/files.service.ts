import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './enities/files.entity';
import { Repository } from 'typeorm';
import { IFilesService } from './files.service.interface';

@Injectable()
export class FilesService implements IFilesService {
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
  async create(file: FileEntity): Promise<FileEntity> {
    const newFile = this.FilesRepository.create(file)
    return await this.FilesRepository.save(newFile)
  }
}
