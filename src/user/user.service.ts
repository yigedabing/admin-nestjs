import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IRegister } from 'src/auth/auth.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { username, password },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async register(params: IRegister) {
    const { username, password } = params;
    const user = await this.findOne(username, password);
    if (user) {
      throw new HttpException('用户已经存在', HttpStatus.BAD_REQUEST);
    }
    await this.usersRepository.insert({ username, password });
    return '用户注册成功';
  }
}
