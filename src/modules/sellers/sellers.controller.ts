import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CreateSellerService } from './services/create-seller.service';
import {
  createSellerBodySchema,
  type CreateSellerBodySchema,
} from './dtos/create-seller.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { GetSellerProfileService } from './services/get-seller-profile.service';

interface CurrentUserPayload {
  userId: string;
}

@Controller('/sellers')
export class SellersController {
  constructor(
    private readonly createSellerService: CreateSellerService,
    private readonly getSellerProfileService: GetSellerProfileService,
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
  @UseGuards(JwtAuthGuard) // <--- Protegendo a rota!
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    const { userId } = user;
    return this.getSellerProfileService.execute(userId);
  }
}
