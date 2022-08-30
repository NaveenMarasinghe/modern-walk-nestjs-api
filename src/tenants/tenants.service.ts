import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tenant } from './tenants.entity';
import { ITenant } from './ITenant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Tenant[]> {
    const result = await this.prismaService.tenant.findMany();
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
  async getTenantById(id: number): Promise<Tenant[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const tenant = await this.prismaService.tenant.findUnique({
      where: { id: id },
    });
    if (!tenant) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return [tenant];
  }
  async addNewTenant(data: ITenant): Promise<Tenant[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Post request data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.tenant.create({
      data: { code: data.code, name: data.name },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Add new data failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.findAll();
  }
  async updateTenant(data: ITenant, id: number): Promise<Tenant[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!data) {
      throw new HttpException(
        { message: 'Put request data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.tenant.update({
      where: { id: id },
      data: { code: data.code, name: data.name },
    });
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return await this.getTenantById(id);
  }

  async deleteTenant(id: number) {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.tenant.delete({
      where: { id: id },
    });
    if (!result) {
      throw new HttpException(
        { message: 'remove data failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
