import { User } from '../entities/user.mysql.entity';
import { RolePresenter } from './role.presenter';

export class UserPresenter {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarPath: string;
  createdAt: String;
  updatedAt: String;
  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatarPath = user.avatarPath;
  }
}
