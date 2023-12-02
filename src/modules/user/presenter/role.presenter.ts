import { Exclude } from 'class-transformer';
import { User } from '../entities/user.mysql.entity';

export class RolePresenter {
  id: number;
  name: string;

  users: User[];
}
