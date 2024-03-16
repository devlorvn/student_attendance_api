import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import PositionAdmin from "../../positionAdmin/entities/positionAdmin.entity";

@Entity("admin")
export default class Admin {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255, name: "name", type: "varchar" })
  name: string;

  @Column({ length: 255, name: "email", type: "varchar", unique: true })
  email: string;

  @Column({ length: 255, name: "password", type: "varchar" })
  password: string;

  @ManyToOne(() => PositionAdmin, (position: PositionAdmin) => position.id)
  @JoinColumn()
  positionId: string;

  @Column({ type: "jsonb", nullable: true })
  permissions: any | null;

  @Column({ type: "bool", default: true })
  enable: boolean;

  @Column({ type: "jsonb", default: {} })
  more_info: {
    token: string;
    forgetPasswordToken: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password);
    }
  }
}
