import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  createProductBodySchema,
  type CreateProductBodySchema,
} from './dtos/create-product.dto';
import { CreateProductService } from './services/create-product.service';
import { ListAllProductsService } from './services/list-all-products.service';
import {
  listProductsQuerySchema,
  type ListProductsQuerySchema,
} from './dtos/list-products.dto';

interface CurrentUserPayload {
  userId: string;
}

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listAllProductsService: ListAllProductsService,
  ) {}

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

  @Get()
  async findMany(@Query() query: ListProductsQuerySchema) {
    const result = listProductsQuerySchema.safeParse(query);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.listAllProductsService.execute(result.data);
  }
}
