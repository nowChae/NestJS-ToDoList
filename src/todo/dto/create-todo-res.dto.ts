import { User } from 'src/auth/user.entity';

export class CreateTodoResponse {
  title: string;
  completed: boolean;
  user: User;
}
