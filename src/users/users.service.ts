import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { IUser } from './IUser';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<User[]> {
    const result = await this.prismaService.user.findMany();
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return result;
  }
  async getUserById(id: string): Promise<User[]> {
    if (!id) {
      throw new HttpException(
        { message: 'Id data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return [user];
  }
  async addNewUser(data: IUser): Promise<User[]> {
    if (!data) {
      throw new HttpException(
        { message: 'Post request body data found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    const result = await this.prismaService.user.create({
      data: { email: data.email, name: data.name, password: data.password },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Add new data failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.getUserById(data.id.toString());
  }
  async updateUser(data: IUser, id: string): Promise<User[]> {
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

    const result = await this.prismaService.user.update({
      where: { id: parseInt(id) },
      data: { name: data.name, email: data.email, password: data.password },
    });
    if (!result) {
      throw new HttpException(
        { message: 'No data found' },
        HttpStatus.NO_CONTENT,
      );
    }
    return await this.getUserById(id);
  }

  async deleteUser(id: string) {
    if (!id) {
      throw new HttpException(
        { message: 'Id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prismaService.user.delete({
      where: { id: parseInt(id) },
    });
    if (!result) {
      throw new HttpException(
        { message: 'Data remove failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
