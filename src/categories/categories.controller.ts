import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/categories/categories.entity';
import { ICategories } from 'src/categories/ICategories';
import { CategoriesService } from 'src/categories/categories.sevice';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllUsers(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Category[]> {
    return this.categoriesService.getCategoryById(params.id);
  }

  @ApiBody({ type: Category })
  @Post()
  addNewUser(@Body() category: ICategories) {
    return this.categoriesService.addNewCategory(category);
  }

  @ApiBody({ type: Category })
  @Put('/:id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() category: ICategories, @Param() params) {
    return this.categoriesService.updateCategory(category, params.id);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.categoriesService.deleteCategory(params.id);
  }
}
