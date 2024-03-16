import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Admin from "../../admin/entities/admin.entity";

@Entity("position_admin")
export default class PositionAdmin {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255, name: "name", type: "varchar" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToOne(() => Admin, (admin: Admin) => admin.id)
  // @JoinColumn()
  // admin: Admin["id"];
}
