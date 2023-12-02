import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Index({ unique: true })
  @Column()
  value: string;

  @Column()
  name: string;
}
