import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsController } from 'src/modules/tenants/tenants.controller';
import { TenantsService } from 'src/modules/tenants/tenants.service';
import { Tenant } from 'src/modules/tenants/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
