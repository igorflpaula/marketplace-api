import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthenticateSellerService } from './services/authenticate-seller.service';
import {
  authenticateBodySchema,
  type AuthenticateBodySchema,
} from './dtos/authenticate-seller.dto';

@Controller('/sessions')
export class AuthController {
  constructor(
    private readonly authenticateSellerService: AuthenticateSellerService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = authenticateBodySchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException('Invalid request body.');
    }

    try {
      const { accessToken } = await this.authenticateSellerService.execute(
        result.data,
      );

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      return;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
