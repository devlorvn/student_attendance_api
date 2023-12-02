import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.mysql.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ length: 500, name: 'role_name' })
  name: string;

  // @ManyToMany(() => User, (user) => user.roles)
  // users: User[];
}
