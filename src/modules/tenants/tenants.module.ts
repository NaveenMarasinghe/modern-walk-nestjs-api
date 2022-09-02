import { Module } from '@nestjs/common';
import { CommonConnectionModule } from 'src/tenancy/connection/commonConnection/commonConnection.module';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  imports: [],
  controllers: [TenantsController],
  providers: [TenantsService, CommonConnectionModule],
})
export class TenantsModule {}
