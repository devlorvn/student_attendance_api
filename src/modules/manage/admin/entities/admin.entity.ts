import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import PositionAdmin from "../../positionAdmin/entities/positionAdmin.entity";
import { Exclude } from "class-transformer";

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

  @OneToOne(() => PositionAdmin, (position: PositionAdmin) => position.id)
  positionId: string;

  @Column({ type: "jsonb", nullable: true })
  permissions: any | null;

  @Column({ type: "bool", default: true })
  enable: boolean;

  @Column({ type: "jsonb", default: {} })
  more_info: {
    token: string;
    refreshToken: string;
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
