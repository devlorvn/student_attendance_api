import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("notification")
export default class Notification {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255, name: "title", type: "varchar" })
  title: string;

  @Column({ length: 255, name: "content", type: "varchar" })
  content: string;

  @Column({ name: "status", type: "bool", default: false })
  status: boolean;

  @Column({ type: "jsonb", default: {} })
  data: {};

  @Column({ type: "jsonb", default: {} })
  to: {};

  @Column({ type: "jsonb", default: {} })
  schedule: {};

  @CreateDateColumn()
  createdAt: Date;
}
