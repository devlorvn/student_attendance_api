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
import Admin from "../../admin/entities/admin.entity";
import Topic from "../../topic/entities/topic.entity";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";

@Entity("event")
export default class Event {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255, name: "title", type: "varchar" })
  title: string;

  @Column({ length: 255, name: "sub_title", type: "varchar" })
  subTitle: string;

  @Column({ length: 255, name: "content", type: "varchar" })
  content: string;

  @Column({ length: 255, name: "banner", type: "varchar" })
  banner: string;

  @Column({ type: "timestamptz", name: "start_time" })
  startTime: Date;

  @Column({ type: "timestamptz", name: "end_time" })
  endTime: Date;

  @Column({ type: "date", name: "start_registration_date", nullable: true })
  startRegistrationDate: Date | null;

  @Column({ type: "date", name: "end_registration_date", nullable: true })
  endRegistrationDate: Date | null;

  @Column({ type: "bool", default: false })
  registration: boolean;

  @Column({ type: "bool", default: true })
  enable: boolean;

  @Column({ type: "int4" })
  amount: number;

  @Column({ type: "int4", default: 0 })
  registered: number;

  @ManyToMany(() => Topic, (topic) => topic.events, { cascade: true })
  @JoinTable()
  topics: Topic[];

  @OneToMany(() => RegisterEvent, (registerEvent) => registerEvent.eventId, { cascade: true })
  @JoinColumn()
  registers: RegisterEvent[];

  @OneToOne(() => Admin, (admin: Admin) => admin.id)
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(event: Partial<Event>) {
    Object.assign(this, event);
  }
}
