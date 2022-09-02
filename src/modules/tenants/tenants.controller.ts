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
import { Tenant } from './tenants.entity';
import { ITenant } from './ITenant';
import { TenantsService } from 'src/modules/tenants/tenants.service';
import { ParseIntPipe } from 'src/pipes/parseInt';

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
  getUserById(@Param('id', new ParseIntPipe()) id): Promise<Tenant[]> {
    return this.tenantsService.getTenantById(id);
  }

  @ApiBody({ type: Tenant })
  @Post()
  addNewUser(@Body() tenant: ITenant) {
    return this.tenantsService.addNewTenant(tenant);
  }

  @ApiBody({ type: Tenant })
  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() tenant: ITenant, @Param('id', new ParseIntPipe()) id) {
    return this.tenantsService.updateTenant(tenant, id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param('id', new ParseIntPipe()) id) {
    return this.tenantsService.deleteTenant(id);
  }
}
