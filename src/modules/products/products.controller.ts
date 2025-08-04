import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  BadRequestException,
  Get,
  Query,
  Param,
  Put,
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
import { GetProductDetailsService } from './services/get-product-details.service';
import { getProductDetailsParamsSchema } from './dtos/get-product-details.dto';
import { EditProductService } from './services/edit-product.service';
import {
  editProductBodySchema,
  type EditProductBodySchema,
  editProductParamsSchema,
} from './dtos/edit-product.dto';
interface CurrentUserPayload {
  userId: string;
}

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listAllProductsService: ListAllProductsService,
    private readonly getProductDetailsService: GetProductDetailsService,
    private readonly editProductService: EditProductService,
  ) {}

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async update(
    @CurrentUser() user: CurrentUserPayload,
    @Param() params: { id: string },
    @Body() body: EditProductBodySchema,
  ) {
    const paramsResult = editProductParamsSchema.safeParse(params);
    if (!paramsResult.success) {
      throw new BadRequestException(paramsResult.error.flatten().fieldErrors);
    }

    const bodyResult = editProductBodySchema.safeParse(body);
    if (!bodyResult.success) {
      throw new BadRequestException(bodyResult.error.flatten().fieldErrors);
    }

    await this.editProductService.execute(
      paramsResult.data.id,
      user.userId,
      bodyResult.data,
    );
  }

  @Get('/:id')
  async findById(@Param() params: { id: string }) {
    const result = getProductDetailsParamsSchema.safeParse(params);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.getProductDetailsService.execute(result.data.id);
  }

  @Get()
  async findMany(@Query() query: ListProductsQuerySchema) {
    const result = listProductsQuerySchema.safeParse(query);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.listAllProductsService.execute(result.data);
  }

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
