import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductRating } from './productRating.entity';
import { IProduct } from './IProduct';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Product[]> {
    const result = await this.prismaService.product.findMany({
      include: { rating: true },
    });
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return result;
  }
  async getProductById(id: string): Promise<Product[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.prismaService.product.findUnique({
      where: { id: parseInt(id) },
      include: { rating: true },
    });
    if (!product) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return [product];
  }
  async addNewProduct(data: IProduct): Promise<Product[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Post request data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    const result = await this.prismaService.product_rating.create({
      data: { productId: product.id, rate: data.rating.rate },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Add new product failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.getProductById(data.id.toString());
  }
  async updateProduct(data: IProduct, id: string): Promise<Product[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!data) {
      throw new HttpException(
        { message: 'Put request data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
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

    const result = await this.prismaService.product_rating.update({
      where: { productId: product.id },
      data: {
        productId: product.id,
        rate: data.rating.rate,
      },
    });

    if (!result) {
      throw new HttpException(
        { message: 'Data update failed' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.getProductById(id);
  }

  async deleteProduct(id: string) {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const productResult = await this.prismaService.product.delete({
      where: { id: parseInt(id) },
    });
    const ratingsResult = await this.prismaService.product_rating.delete({
      where: { productId: parseInt(id) },
    });
    if (!productResult && !ratingsResult) {
      throw new HttpException(
        { message: 'Data remove failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Product ID: ' + id + ' removed';
  }
}
