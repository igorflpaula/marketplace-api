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
  Patch,
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
import { ListSellerProductsService } from './services/list-seller-products.service';
import { ChangeProductStatusService } from './services/change-product-status.service';
import {
  changeProductStatusBodySchema,
  changeProductStatusParamsSchema,
  type ChangeProductStatusBodySchema,
} from './dtos/change-product-status.dto';
import { RegisterProductViewService } from './services/register-product-view.service';
import { registerProductViewParamsSchema } from './dtos/register-product-view.dto';

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
    private readonly listSellerProductsService: ListSellerProductsService,
    private readonly changeProductStatusService: ChangeProductStatusService,
    private readonly registerProductViewService: RegisterProductViewService,
  ) {}

  @Post('/:id/view')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async registerView(
    @CurrentUser() user: CurrentUserPayload,
    @Param() params: { id: string },
  ) {
    const paramsResult = registerProductViewParamsSchema.safeParse(params);
    if (!paramsResult.success) {
      throw new BadRequestException(paramsResult.error.flatten().fieldErrors);
    }

    await this.registerProductViewService.execute(
      paramsResult.data.id,
      user.userId,
    );
  }

  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async changeStatus(
    @CurrentUser() user: CurrentUserPayload,
    @Param() params: { id: string },
    @Body() body: ChangeProductStatusBodySchema,
  ) {
    const paramsResult = changeProductStatusParamsSchema.safeParse(params);
    if (!paramsResult.success) {
      throw new BadRequestException(paramsResult.error.flatten().fieldErrors);
    }

    const bodyResult = changeProductStatusBodySchema.safeParse(body);
    if (!bodyResult.success) {
      throw new BadRequestException(bodyResult.error.flatten().fieldErrors);
    }

    await this.changeProductStatusService.execute(
      paramsResult.data.id,
      user.userId,
      bodyResult.data.status,
    );
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findSellerProducts(
    @CurrentUser() user: CurrentUserPayload,
    @Query() query: ListProductsQuerySchema,
  ) {
    const result = listProductsQuerySchema.safeParse(query);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.listSellerProductsService.execute(user.userId, result.data);
  }

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
