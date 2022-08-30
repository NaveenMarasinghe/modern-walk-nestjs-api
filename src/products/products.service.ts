import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { IProduct } from './IProduct';
import { PrismaService } from 'src/prisma/prisma.service';

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
  async getProductById(id: number): Promise<Product[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.prismaService.product.findUnique({
      where: { id: id },
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
  async addNewProduct(data: IProduct): Promise<IProduct[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Post request data found' },
        HttpStatus.BAD_REQUEST,
      );
    }

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
    const productRating = await this.prismaService.product_rating.create({
      data: { productId: product.id, rate: data.rating.rate },
    });
    if (!product && !productRating) {
      throw new HttpException(
        { message: 'Add new product failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: IProduct[] = [
      {
        id: product.id,
        title: product.title,
        tenantId: product.tenantId,
        description: product.description,
        category: product.category,
        price: product.price,
        image: product.title,
        rating: {
          id: productRating.id,
          productId: productRating.productId,
          rate: productRating.rate,
        },
      },
    ];
    return result;
  }
  async updateProduct(data: IProduct, id: number): Promise<Product[]> {
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
      where: { id: id },
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

  async deleteProduct(id: number) {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const productResult = await this.prismaService.product.delete({
      where: { id: id },
    });
    if (!productResult) {
      throw new HttpException(
        { message: 'Data remove failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Product ID: ' + id + ' removed';
  }
}
