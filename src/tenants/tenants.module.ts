import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  imports: [],
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService],
})
export class TenantsModule {}
