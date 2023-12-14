import { UserGender } from "src/common/enums/userType.enum";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcryptjs";

@Entity("student")
export class Student {
  @PrimaryGeneratedColumn({
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
  validate: false;

  @Column({ type: "timestamptz", nullable: true })
  validateAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

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
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, process.env.BCRYPT_SALT);
    }
  }
}
