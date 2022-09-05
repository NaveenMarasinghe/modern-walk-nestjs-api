import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/modules/common/categories/category.entity';
import { ICategories } from 'src/modules/common/categories/ICategories';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  private readonly categoriesRepository: Repository<Category>;
  constructor(
    @Inject('COMMON_CONNECTION')
    commonConnection,
  ) {
    this.categoriesRepository = commonConnection.getRepository(Category);
  }
  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }
  async getCategoryById(data: number): Promise<Category[]> {
    const category = await this.categoriesRepository.findOne({ id: data });
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
