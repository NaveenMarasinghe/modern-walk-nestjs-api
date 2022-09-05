import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  productId: number;

  @Column({ type: 'float' })
  rate: number;

  @OneToOne(() => Product, (product) => product.rating)
  product: Product;
}
