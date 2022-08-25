import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { IUser } from './IUser';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
  async getUserById(id: string): Promise<User[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: parseInt(id) },
    });
    return [user];
  }
  async addNewUser(data: IUser): Promise<User[]> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    await this.prismaService.user.create({
      data: { email: data.email, name: data.name, password: data.password },
    });
    return await this.findAll();
  }
  async updateUser(data: IUser, id: string): Promise<User[]> {
    await this.prismaService.user.update({
      where: { id: parseInt(id) },
      data: { name: data.name, email: data.email, password: data.password },
    });

    return await this.getUserById(id);
  }

  async deleteUser(id: string) {
    const result = await this.prismaService.user.delete({
      where: { id: parseInt(id) },
    });
    return result;
  }
}
