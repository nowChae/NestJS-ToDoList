import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    return this.findOne({ where: { kakaoId } });
  }

  async createUser(user): Promise<void> {
    try {
      const existingUser = await this.findUserByKakaoId(user.kakaoId);

      if (existingUser) {
        throw new ConflictException('이미 존재하는 사용자입니다.');
      }

      const newUser = this.create({
        kakaoId: user.kakaoId,
        displayName: user.displayName,
      });

      await this.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // 이미 존재하는 사용자 예외는 다시 던지기
      }
      // 다른 예외인 경우 처리할 수 있음
      throw new Error('사용자 생성 중에 오류가 발생했습니다.');
    }
  }
}
