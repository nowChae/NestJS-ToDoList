import { Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

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
      const accessToken = await this.authService.loginUser(user);
      res.cookie('access_token', accessToken);
      res.redirect('/login.html');
      console.log(accessToken);
    }
    return;
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  userProfile(@GetUser() user: User) {
    return user;
  }

  @Get('/kakao/logout')
  kakaoLogout(@Req() req, @Res() res: Response) {
    console.log('로그아웃');
    res.redirect('/login.html');
    return;
  }
}
