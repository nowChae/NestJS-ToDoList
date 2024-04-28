import { Todo } from 'src/todo/todo.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kakaoId: string;

  @Column()
  displayName: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
