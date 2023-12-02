import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.mysql.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'first_name' })
  firstName: string;

  @Column({ length: 500, name: 'last_name' })
  lastName: string;

  @Column({ length: 500, nullable: true })
  email: string;

  @Column({ name: 'avatar_path', nullable: true })
  avatarPath: string;

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable({
  //   name: 'users_role',
  //   joinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'role_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // roles: Role[];

  // constructor(partial: Partial<User>) {
  //   super();
  //   Object.assign(this, partial);
  // }
}
