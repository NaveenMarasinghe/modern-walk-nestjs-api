import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRating } from './productRating.entity';
import { IProduct } from './IProduct';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly productsRepository: Repository<Product>;
  private readonly productRatingsRepository: Repository<ProductRating>;
  constructor(
    @Inject('TENANT_CONNECTION')
    tenantConnection,
  ) {
    this.productsRepository = tenantConnection.getRepository(Product);
    this.productRatingsRepository =
      tenantConnection.getRepository(ProductRating);
  }
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }
  async getProductById(id: number): Promise<Product[]> {
    const product = await this.productsRepository.findOne(id);
    return [product];
  }
  async addNewProduct(data: IProduct): Promise<Product[]> {
    const productRating = new ProductRating();
    productRating.rate = data.rating.rate;

    const product = new Product();
    product.title = data.title;
    product.tenantId = data.tenantId;
    product.description = data.description;
    product.category = data.category;
    product.image = data.image;
    product.price = data.price;
    product.rating = productRating;

    await this.productsRepository.save(product);
    return await this.findAll();
  }
  async updateProduct(data: IProduct, id: number): Promise<Product[]> {
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        title: data.title,
        tenantId: data.tenantId,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    await this.productRatingsRepository
      .createQueryBuilder()
      .update(ProductRating)
      .set({
        rate: data.rating.rate,
      })
      .where({
        productId: id,
      })
      .returning('*')
      .execute();

    return await this.getProductById(id);
  }

  async deleteProduct(data: number) {
    const result = await this.productsRepository.delete({ id: data });
    return result;
  }
}
