import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(' invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(' invalid credentials.');
    }

    // Generate JWT

    const accessToken = await this.generateAccessToken(user.id);

    const data = {
      accessToken,
      userRole: user.role,
    };

    return { data };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password, role = 'USER' } = signupDto;

    const emailTaken = await this.userRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email already in use');
    }

    const hasgedPassword = await hash(password, 12);

    const user = await this.userRepo.create({
      data: {
        name,
        email,
        password: hasgedPassword,        
        role: role,
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    const data = {
      accessToken,
      userRole: user.role,
    };

    return { data };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
