import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { IUser } from 'src/modules/users/IUser';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOne(username: string): Promise<User[]> {
    const user = await this.usersRepository.findOneBy({ name: username });
    return [user];
  }
  async addNewUser(data: IUser): Promise<User[]> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    await this.usersRepository.save(user);
    return await this.findAll();
  }
  async updateUser(data: IUser, id: number): Promise<User[]> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteUser(data: number) {
    const result = await this.usersRepository.delete({ id: data });
    return result;
  }
}
