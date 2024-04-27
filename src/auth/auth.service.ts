import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(user): Promise<{ accessToken: string }> {
    const payload = { kakaoId: user.kakaoId };
    console.log(payload);
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async loginUser(user): Promise<{ accessToken: string }> {
    const existingUser = await this.userRepository.findUserByKakaoId(user.kakaoId);
    if (!existingUser) {
      await this.userRepository.createUser(user);
    }
    return this.createAccessToken(user);
  }
}
