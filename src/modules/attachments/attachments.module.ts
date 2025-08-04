import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { R2Storage } from 'src/infra/storage/r2-storage';
import { PrismaService } from 'src/infra/database/prisma.service';
import { AttachmentsRepository } from './repositories/attachments.repository';

@Module({
  controllers: [AttachmentsController],
  providers: [R2Storage, PrismaService, AttachmentsRepository],
  exports: [AttachmentsRepository],
})
export class AttachmentsModule {}
