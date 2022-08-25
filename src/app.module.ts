import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TenantsModule } from './tenants/tenants.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, UsersModule, ProductsModule, TenantsModule],
})
export class AppModule {}
