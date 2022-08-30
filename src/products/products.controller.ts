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
import { Product } from './products.entity';
import { IProduct } from './IProduct';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/pipes/parseInt';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllUsers(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getUserById(@Param('id', new ParseIntPipe()) id): Promise<Product[]> {
    return this.productsService.getProductById(id);
  }

  @ApiBody({ type: Product })
  @Post()
  addNewUser(@Body() user: IProduct) {
    return this.productsService.addNewProduct(user);
  }

  @ApiBody({ type: Product })
  @Put('/:id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() user: IProduct, @Param('id', new ParseIntPipe()) id) {
    return this.productsService.updateProduct(user, id);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param('id', new ParseIntPipe()) id) {
    return this.productsService.deleteProduct(id);
  }
}
