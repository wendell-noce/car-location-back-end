import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CarRepository } from './repositories/car.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CarRepository],
  exports: [UsersRepository, CarRepository],
})
export class DatabaseModule {}
