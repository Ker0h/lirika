import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@lirika/backend/features';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersService.findByEmail(email);
  console.log('Found user:', user); // Check if user is found

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const { password, ...result } = user.toObject();;
      return result;
    }
  }

  throw new UnauthorizedException('Invalid credentials');
}


  async login(user: any) {
    const payload = { userId: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      registeredAt: user.registeredAt,
    };
  }
}
