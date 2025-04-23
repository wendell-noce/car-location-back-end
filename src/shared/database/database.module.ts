import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CarCategoryRepository } from './repositories/car-category.repositories';
import { CarRepository } from './repositories/car.repositories';
import { RentalRepository } from './repositories/rental.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CarRepository, CarCategoryRepository, RentalRepository],
  exports: [UsersRepository, CarRepository, CarCategoryRepository, RentalRepository],
})
export class DatabaseModule {}
