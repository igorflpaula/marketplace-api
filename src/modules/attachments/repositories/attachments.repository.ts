import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(title: string, url: string) {
    return this.prisma.attachment.create({
      data: {
        title,
        url,
      },
    });
  }

  async findManyByIds(ids: string[]) {
    return this.prisma.attachment.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
