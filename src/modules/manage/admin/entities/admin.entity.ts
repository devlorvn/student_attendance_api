import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import PositionAdmin from '../../positionAdmin/entities/positionAdmin.entity';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 255, name: 'name', type: 'varchar' })
  name: string;

  @Column({ length: 255, name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ length: 255, name: 'password', type: 'varchar' })
  password: string;

  //   @Column({ name: 'positionId', type: 'uuid' })
  //   positionId: string;
  @OneToOne(() => PositionAdmin, (position: PositionAdmin) => position.id)
  positionId: string;

  @Column({ type: 'jsonb', nullable: true })
  permissions: any | null;

  @Column({ type: 'bool', default: true })
  enable: boolean;

  @Column({ type: 'jsonb', nullable: true })
  more_info: string[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
