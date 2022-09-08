import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/modules/tenants/tenant.entity';
import { ITenant } from 'src/modules/tenants/ITenant';
import { Repository } from 'typeorm';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
  ) {}
  async findAll(): Promise<Tenant[]> {
    return await this.tenantsRepository.find();
  }
  async getTenantById(data: number): Promise<Tenant[]> {
    const tenant = await this.tenantsRepository.findOneBy({ id: data });
    return [tenant];
  }
  async addNewTenant(data: ITenant): Promise<Tenant[]> {
    const tenant = new Tenant();
    tenant.code = data.code;
    tenant.name = data.name;

    await this.tenantsRepository.save(tenant);
    return await this.findAll();
  }
  async updateTenant(data: ITenant, id: number): Promise<Tenant[]> {
    const result = await this.tenantsRepository
      .createQueryBuilder()
      .update({
        code: data.code,
        name: data.name,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteTenant(data: number) {
    const result = await this.tenantsRepository.delete({ id: data });
    return result;
  }
}
