import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Notification from "../../notification/entities/notification.entity";
import { Student } from "src/modules/student/entities/student.entity";

@Entity("notification_user")
export default class NotificationUser {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Notification, (notify) => notify.id, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "notification_id",
  })
  notificationId: Notification["id"];

  @Column({ name: "mssv", type: "int4" })
  mssv: Student["mssv"];

  @Column({ name: "seen", type: "bool", default: false })
  seen: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
