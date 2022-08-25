import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductRating } from './productRating.entity';
import { IProduct } from './IProduct';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      include: { rating: true },
    });
  }
  async getProductById(id: string): Promise<Product[]> {
    const product = await this.prismaService.product.findUnique({
      where: { id: parseInt(id) },
      include: { rating: true },
    });
    return [product];
  }
  async addNewProduct(data: IProduct): Promise<Product[]> {
    const productRating = new ProductRating();
    productRating.rate = data.rating.rate;

    const product = await this.prismaService.product.create({
      data: {
        title: data.title,
        tenantId: data.tenantId,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
      },
    });
    await this.prismaService.product_rating.create({
      data: { productId: product.id, rate: data.rating.rate },
    });
    return await this.findAll();
  }
  async updateProduct(data: IProduct, id: string): Promise<Product[]> {
    const product = await this.prismaService.product.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        tenantId: data.tenantId,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
      },
    });

    await this.prismaService.product_rating.update({
      where: { productId: product.id },
      data: {
        productId: product.id,
        rate: data.rating.rate,
      },
    });

    return await this.getProductById(id);
  }

  async deleteProduct(id: string) {
    const productResult = await this.prismaService.product.delete({
      where: { id: parseInt(id) },
    });
    const ratingsResult = await this.prismaService.product_rating.delete({
      where: { productId: parseInt(id) },
    });
    if (productResult && ratingsResult) {
      return 'Product ID: ' + id + ' removed';
    }
  }
}
