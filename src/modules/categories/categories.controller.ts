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
import { ParseIntPipe } from 'src/pipes/parseInt';

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
  getUserById(@Param('id', new ParseIntPipe()) id): Promise<Category[]> {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiBody({ type: Category })
  @Post()
  addNewUser(@Body() category: ICategories) {
    return this.categoriesService.addNewCategory(category);
  }

  @ApiBody({ type: Category })
  @Put('/:id')
  @ApiParam({ name: 'id' })
  updateUser(
    @Body() category: ICategories,
    @Param('id', new ParseIntPipe()) id,
  ) {
    return this.categoriesService.updateCategory(category, id);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param('id', new ParseIntPipe()) id) {
    return this.categoriesService.deleteCategory(id);
  }
}
