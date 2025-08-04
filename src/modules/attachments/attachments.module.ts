import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { R2Storage } from 'src/infra/storage/r2-storage';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  controllers: [AttachmentsController],
  providers: [R2Storage, PrismaService],
})
export class AttachmentsModule {}
