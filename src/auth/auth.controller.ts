import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao')) // 카카오 로그인을 위한 Guard 설정
  kakaoLogin(@Req() req): Promise<void> {
    const user = req.user;

    if (!user) {
      throw new NotFoundException('해당하는 user 정보가 없습니다.');
    } else {
      this.authService.createUser(user);
    }
    return;
  }
}
