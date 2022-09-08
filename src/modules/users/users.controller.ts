import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { IUser } from './IUser';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/pipes/parseInt';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param('id', new ParseIntPipe()) id): Promise<User[]> {
    return this.usersService.getUserById(id);
  }

  @ApiBody({ type: User })
  @Post()
  addNewUser(@Body() user: IUser) {
    return this.usersService.addNewUser(user);
  }

  @ApiBody({ type: User })
  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() user: IUser, @Param('id', new ParseIntPipe()) id) {
    return this.usersService.updateUser(user, id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param('id', new ParseIntPipe()) id) {
    return this.usersService.deleteUser(id);
  }
}
