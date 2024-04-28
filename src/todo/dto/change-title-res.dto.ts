import { User } from 'src/auth/user.entity';

export class ChangeTitleDtoResponse {
  title: string;
  completed: boolean;
  user: User;
}
