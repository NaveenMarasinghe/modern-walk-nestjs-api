import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { ICategories } from './ICategories';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Category[]> {
    const result = await this.prismaService.category.findMany();
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
  async getCategoryById(id: number): Promise<Category[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.prismaService.category.findUnique({
      where: { id: id },
    });
    if (!category) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return [category];
  }
  async addNewCategory(data: ICategories): Promise<Category[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Post request body data not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.category.create({
      data: { categoryName: data.categoryName },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Add new data failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.getCategoryById(result.id);
  }
  async updateCategory(data: ICategories, id: number): Promise<Category[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Put request data not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.NO_CONTENT,
      );
    }
    const result = await this.prismaService.category.update({
      where: { id: id },
      data: { categoryName: data.categoryName },
    });

    if (!result) {
      throw new HttpException(
        { message: 'Update failed' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.getCategoryById(id);
  }

  async deleteCategory(id: number) {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.category.delete({
      where: { id: id },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Data remove failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
