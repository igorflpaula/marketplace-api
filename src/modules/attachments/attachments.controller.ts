import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { R2Storage } from 'src/infra/storage/r2-storage';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttachmentsRepository } from './repositories/attachments.repository';

@Controller('/attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
  constructor(
    private storage: R2Storage,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required.');
    }

    const { url } = await this.storage.upload(
      file.originalname,
      file.mimetype,
      file.buffer,
    );

    const attachment = await this.attachmentsRepository.create(
      file.originalname,
      url,
    );

    return {
      attachmentId: attachment.id,
    };
  }
}
