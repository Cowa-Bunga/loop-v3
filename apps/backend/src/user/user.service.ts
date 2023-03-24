import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(email: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(params: CreateUserDto) {
    const user = await new User();
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password = await this.hashPassword(params.password);
    return await this.usersRepository.save(user);
  }

  async hashPassword(plain: string): Promise<string> {
    // TODO: WIP: enable and store salt !!!! preferably improve on auth further
    // const saltRounds = 10;
    // const hashed: string = await bcrypt.hash(plain, saltRounds);
    // return hashed;
    return plain;
  }
}
