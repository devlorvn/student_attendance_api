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
import Event from "../../event/entities/event.entity";

@Entity("topic")
export default class Topic {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255, name: "name", type: "varchar" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Event, (event) => event.id)
  @JoinTable()
  events: Event[];
}
