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
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
  constructor(
    private storage: R2Storage,
    private prisma: PrismaService,
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

    const attachment = await this.prisma.attachment.create({
      data: {
        title: file.originalname,
        url: url,
        productId: null,
      },
    });

    return {
      attachmentId: attachment.id,
    };
  }
}
