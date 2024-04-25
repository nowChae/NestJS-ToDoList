import { Controller, Get, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao')) // 카카오 로그인을 위한 Guard 설정
  async kakaoLogin(@Req() req, @Res() res: Response): Promise<void> {
    const user = req.user;

    if (!user) {
      throw new NotFoundException('해당하는 user 정보가 없습니다.');
    } else {
      await this.authService.createUser(user);
      res.redirect('/login.html');
      console.log('로그인 성공');
    }
    return;
  }
}
