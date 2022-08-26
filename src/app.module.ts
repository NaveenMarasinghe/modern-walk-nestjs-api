import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TenantsModule } from './tenants/tenants.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { ResponseTimeMiddleware } from './middleware/reponseTime.middleware';

@Module({
  imports: [CategoriesModule, UsersModule, ProductsModule, TenantsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
