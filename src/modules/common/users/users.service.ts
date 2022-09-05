import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/common/users/user.entity';
import { IUser } from 'src/modules/common/users/IUser';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>;
  constructor(
    @Inject('COMMON_CONNECTION')
    commonConnection,
  ) {
    this.usersRepository = commonConnection.getRepository(User);
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async getUserById(data: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({ id: data });
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
