import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
