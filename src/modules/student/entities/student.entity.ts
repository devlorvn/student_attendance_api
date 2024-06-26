import { UserGender } from "src/common/enums/userType.enum";
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";

@Entity("student")
export class Student {
  @PrimaryColumn({
    type: "int4",
  })
  mssv: number;

  @Column({ length: 500, name: "first_name", type: "varchar" })
  firstName: string;

  @Column({ length: 500, name: "last_name", type: "varchar" })
  lastName: string;

  @Column({ type: "date" })
  dob: Date;

  @Column({ type: "varchar" })
  password: string;

  @Column({ name: "gender", enum: UserGender, type: "varchar" })
  gender: UserGender;

  @Column({ type: "varchar" })
  class: string;

  @Column({ type: "varchar" })
  major: string;

  @Column({ type: "int2" })
  startYear: number;

  @Column({ type: "varchar", nullable: true })
  avatar: string | null;

  @Column({ type: "jsonb", default: [] })
  images: string[];

  @Column({ type: "bool", default: false })
  validate: boolean;

  @Column({ type: "timestamptz", nullable: true })
  validateAt: Date | null;

  @Column({
    type: "uuid",
    nullable: true,
  })
  validateBy: string | null;

  @Column({ type: "bool", default: true })
  enable: boolean;

  @Column({ type: "jsonb", default: {} })
  moreInfo: {
    token: string;
    refreshToken: string;
    forgetPasswordToken: string;
  };

  @OneToMany(() => RegisterEvent, (registerEvent) => registerEvent.mssv)
  @JoinColumn()
  events: RegisterEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password);
    }
  }
}
