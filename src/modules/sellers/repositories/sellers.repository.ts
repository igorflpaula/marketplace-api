import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateSellerBodySchema } from '../dtos/create-seller.dto';
import { Seller } from '@prisma/client';

@Injectable()
export class SellersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Seller | null> {
    return this.prisma.seller.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<Seller | null> {
    return this.prisma.seller.findUnique({
      where: { phone },
    });
  }

  async create(data: CreateSellerBodySchema, hashedPassword): Promise<Seller> {
    return this.prisma.seller.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
    });
  }

  async findById(id: string): Promise<Seller | null> {
    return this.prisma.seller.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Seller>): Promise<Seller> {
    return this.prisma.seller.update({
      where: { id },
      data,
    });
  }
}
