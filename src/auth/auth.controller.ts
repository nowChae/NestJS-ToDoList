import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao')) // 카카오 로그인을 위한 Guard 설정
  async kakaoLogin(@Req() req) {
    console.log(req.user);
    return req.user; // Passport에 의해 인증된 사용자 정보 반환
  }
}
