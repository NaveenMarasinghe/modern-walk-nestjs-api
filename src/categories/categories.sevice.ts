import { Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { ICategories } from './ICategories';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }
  async getCategoryById(id: string): Promise<Category[]> {
    const category = await this.prismaService.category.findUnique({
      where: { id: parseInt(id) },
    });
    return [category];
  }
  async addNewCategory(data: ICategories): Promise<Category[]> {
    await this.prismaService.category.create({
      data: { categoryName: data.categoryName },
    });
    return await this.findAll();
  }
  async updateCategory(data: ICategories, id: string): Promise<Category[]> {
    await this.prismaService.category.update({
      where: { id: parseInt(id) },
      data: { categoryName: data.categoryName },
    });

    return await this.getCategoryById(id);
  }

  async deleteCategory(id: string) {
    const result = await this.prismaService.category.delete({
      where: { id: parseInt(id) },
    });
    return result;
  }
}
