import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Event from "../../event/entities/event.entity";
import NotificationUser from "../../notificationUser/entities/notificationUser.entity";

@Entity("notification")
export default class Notification {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ name: "event_id", type: "uuid" })
  eventId: Event["id"];

  @Column({ length: 255, name: "title", type: "varchar" })
  title: string;

  @Column({ length: 255, name: "content", type: "varchar" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
