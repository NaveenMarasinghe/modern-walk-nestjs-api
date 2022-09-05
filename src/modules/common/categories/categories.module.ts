import { Module } from '@nestjs/common';
import { CategoriesController } from 'src/modules/common/categories/categories.controller';
import { CategoriesService } from 'src/modules/common/categories/categories.sevice';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
