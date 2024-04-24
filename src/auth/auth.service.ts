import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  createUser(user): Promise<void> {
    this.userRepository.createUser(user);
    return;
  }
}
