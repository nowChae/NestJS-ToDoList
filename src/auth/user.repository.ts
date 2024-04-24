import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    return this.findOne({ where: { kakaoId } });
  }

  async createUser(user: { kakaoId: string; displayName: string }): Promise<void> {
    const existingUser = await this.findUserByKakaoId(user.kakaoId);

    if (!existingUser) {
      const newUser = this.create({
        kakaoId: user.kakaoId,
        displayName: user.displayName,
      });

      await this.save(newUser);
    } else {
      throw new Error('이미 존재하는 사용자입니다.'); // 이미 존재할 경우 예외 처리
    }
  }
}
