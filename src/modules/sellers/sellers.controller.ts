import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  UseGuards,
  Get,
  Put,
} from '@nestjs/common';
import { CreateSellerService } from './services/create-seller.service';
import {
  createSellerBodySchema,
  type CreateSellerBodySchema,
} from './dtos/create-seller.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { GetSellerProfileService } from './services/get-seller-profile.service';
import { UpdateSellerProfileService } from './services/update-seller-profile.service';
import {
  updateSellerProfileBodySchema,
  type UpdateSellerProfileBodySchema,
} from './dtos/update-seller-profile.dto';

interface CurrentUserPayload {
  userId: string;
}

@Controller('/sellers')
export class SellersController {
  constructor(
    private readonly createSellerService: CreateSellerService,
    private readonly getSellerProfileService: GetSellerProfileService,
    private readonly updateSellerProfileService: UpdateSellerProfileService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateSellerBodySchema) {
    const result = createSellerBodySchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return this.createSellerService.execute(result.data);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    const { userId } = user;
    return this.getSellerProfileService.execute(userId);
  }

  @Put('/profile')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: UpdateSellerProfileBodySchema,
  ) {
    const { userId } = user;
    const result = updateSellerProfileBodySchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    await this.updateSellerProfileService.execute(userId, result.data);
  }
}
