import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './modules/products/products.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { User } from './modules/users/user.entity';
import { Product } from './modules/products/product.entity';
import { Tenant } from './modules/tenants/tenant.entity';
import { Category } from './modules/categories/category.entity';
import { ProductRating } from './modules/products/productRating.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TenantsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [User, Product, Tenant, Category, ProductRating],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
