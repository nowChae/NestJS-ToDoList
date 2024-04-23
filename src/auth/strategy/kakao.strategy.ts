import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.REST_API_KEY,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      // 사용자의 카카오 프로필 정보
      const kakaoProfile = profile._json;
      console.log(kakaoProfile);

      // 필요한 사용자 정보 추출 (닉네임과 프로필 사진)
      const user = {
        kakaoId: kakaoProfile.id, // 카카오 ID
        displayName: kakaoProfile.properties.nickname, // 카카오 닉네임
        profileImage: kakaoProfile.properties.profile_image, // 카카오 프로필 사진
      };

      done(null, user); // Passport에 사용자 정보 전달
    } catch (error) {
      done(error, false); // 오류 발생 시 Passport에 오류 전달
    }
  }
}
