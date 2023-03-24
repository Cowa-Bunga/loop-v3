import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const hashedPW = await this.usersService.hashPassword(password);
    console.warn('validateUser', user, hashedPW);
    if (user?.password === hashedPW) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
