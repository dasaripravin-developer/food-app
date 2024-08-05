import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const result = await this.userService.findOne(email);
      console.log('result => ', result)
      if (!result) return { message: 'Invalid email id' };
      if (result?.password !== password) {
        return { message: 'Invalid password' };
      }
      return {
        access_token: await this.jwtService.signAsync({
          userId: email,
          address: result.address,
        }),
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
