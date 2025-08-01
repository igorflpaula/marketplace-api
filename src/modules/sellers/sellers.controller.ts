import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { CreateSellerService } from './services/create-seller.service';
import {
  createSellerBodySchema,
  type CreateSellerBodySchema,
} from './dtos/create-seller.dto';

@Controller('/sellers')
export class SellersController {
  constructor(private readonly createSellerService: CreateSellerService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateSellerBodySchema) {
    const result = createSellerBodySchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.createSellerService.execute(result.data);
  }
}
