import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    return this.findOne({ where: { kakaoId } });
  }

  async createUser(user): Promise<void> {
    try {
      const existingUser = await this.findUserByKakaoId(user.kakaoId);

      if (!existingUser) {
        const newUser = this.create({
          kakaoId: user.kakaoId,
          displayName: user.displayName,
        });

        await this.save(newUser);
        console.log('회원가입 성공');
      }
    } catch (error) {
      // 다른 예외인 경우 처리할 수 있음
      throw new Error('사용자 생성 중에 오류가 발생했습니다.');
    }
  }
}
