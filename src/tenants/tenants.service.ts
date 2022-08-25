import { Injectable } from '@nestjs/common';
import { Tenant } from './tenants.entity';
import { ITenant } from './ITenant';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Tenant[]> {
    return await this.prismaService.tenant.findMany();
  }
  async getTenantById(id: string): Promise<Tenant[]> {
    const tenant = await this.prismaService.tenant.findUnique({
      where: { id: parseInt(id) },
    });
    return [tenant];
  }
  async addNewTenant(data: ITenant): Promise<Tenant[]> {
    await this.prismaService.tenant.create({
      data: { code: data.code, name: data.name },
    });
    return await this.findAll();
  }
  async updateTenant(data: ITenant, id: string): Promise<Tenant[]> {
    await this.prismaService.tenant.update({
      where: { id: parseInt(id) },
      data: { code: data.code, name: data.name },
    });

    return await this.getTenantById(id);
  }

  async deleteTenant(id: string) {
    const result = await this.prismaService.tenant.delete({
      where: { id: parseInt(id) },
    });
    return result;
  }
}
