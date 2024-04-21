import { IsNotEmpty } from 'class-validator';

export class ChangeTitleDtoRequest {
  @IsNotEmpty()
  title: string;
}
