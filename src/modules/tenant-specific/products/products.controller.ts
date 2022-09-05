import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { IProduct } from './IProduct';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllUsers(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Product[]> {
    return this.productsService.getProductById(params.id);
  }

  @ApiBody({ type: Product })
  @Post()
  addNewUser(@Body() user: IProduct) {
    return this.productsService.addNewProduct(user);
  }

  @ApiBody({ type: Product })
  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() user: IProduct, @Param() params) {
    return this.productsService.updateProduct(user, params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.productsService.deleteProduct(params.id);
  }
}
