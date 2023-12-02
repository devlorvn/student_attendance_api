import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn({ generated: true })
  id: string;

  // @Index({ unique: true })
  // @Column()
  // value: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ name: 'avatar_path', nullable: true })
  avatarPath: string;
}
