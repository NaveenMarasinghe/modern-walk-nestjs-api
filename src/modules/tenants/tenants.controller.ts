import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/modules/tenants/tenant.entity';
import { ITenant } from 'src/modules/tenants/ITenant';
import { TenantsService } from 'src/modules/tenants/tenants.service';

@Controller('tenants')
@ApiTags('Tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  getAllUsers(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Tenant[]> {
    return this.tenantsService.getTenantById(params.id);
  }

  @ApiBody({ type: Tenant })
  @Post()
  addNewUser(@Body() tenant: ITenant) {
    return this.tenantsService.addNewTenant(tenant);
  }

  @ApiBody({ type: Tenant })
  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() tenant: ITenant, @Param() params) {
    return this.tenantsService.updateTenant(tenant, params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.tenantsService.deleteTenant(params.id);
  }
}
