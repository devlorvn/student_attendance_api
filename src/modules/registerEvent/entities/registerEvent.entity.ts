import Event from "src/modules/manage/event/entities/event.entity";
import { Student } from "src/modules/student/entities/student.entity";
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

@Entity("register_event")
export default class RegisterEvent {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "event_id",
  })
  eventId: Event["id"];

  @ManyToOne(() => Student, (student) => student.mssv, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "mssv",
  })
  mssv: Student["mssv"];

  @Column({ name: "attendance", type: "bool", default: false })
  attendance: boolean;

  @Column({ length: 255, name: "attendance_image", type: "varchar", nullable: true })
  attendanceImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
