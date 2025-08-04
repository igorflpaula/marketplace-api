import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  createProductBodySchema,
  type CreateProductBodySchema,
} from './dtos/create-product.dto';
import { CreateProductService } from './services/create-product.service';

interface CurrentUserPayload {
  userId: string;
}

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  @HttpCode(201)
  async create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: CreateProductBodySchema,
  ) {
    const result = createProductBodySchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.createProductService.execute(result.data, user.userId);
  }
}
