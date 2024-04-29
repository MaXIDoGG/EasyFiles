import { FileEntity } from './enities/files.entity';

export interface IFilesService {
	findAll(): Promise<FileEntity[]>
  findOne(id: number): Promise<FileEntity>
  remove(id: number): Promise<void>
  create(file: FileEntity): Promise<FileEntity>
}