import { Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return this.userRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
