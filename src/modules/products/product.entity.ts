import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProductRating } from './productRating.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  tenantId: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @OneToOne(() => ProductRating, (rating) => rating.product, {
    cascade: true,
  })
  @JoinColumn()
  rating: ProductRating;
}
