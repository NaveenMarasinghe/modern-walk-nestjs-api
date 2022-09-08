import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/modules/categories/category.entity';
import { ICategories } from 'src/modules/categories/ICategories';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }
  async getCategoryById(data: number): Promise<Category[]> {
    const category = await this.categoriesRepository.findOneBy({ id: data });
    return [category];
  }
  async addNewCategory(data: ICategories): Promise<Category[]> {
    const category = new Category();
    category.categoryName = data.categoryName;

    await this.categoriesRepository.save(category);
    return await this.findAll();
  }
  async updateCategory(data: ICategories, id: number): Promise<Category[]> {
    const result = await this.categoriesRepository
      .createQueryBuilder()
      .update({
        categoryName: data.categoryName,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteCategory(data: number) {
    const result = await this.categoriesRepository.delete({ id: data });
    return result;
  }
}
