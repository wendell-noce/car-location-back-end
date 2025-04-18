import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CarCreateArgs) {
    return this.prismaService.car.create(createDto);
  }

  findFirst(findFirstDto: Prisma.CarFindFirstArgs) {
    return this.prismaService.car.findFirst(findFirstDto);
  }

  findMany<T extends Prisma.CarFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.CarFindManyArgs>,
  ) {
    return this.prismaService.car.findMany(findManyDto);
  }

  update(updateDto: Prisma.CarUpdateArgs) {
    return this.prismaService.car.update(updateDto);
  }
  delete(deleteDto: Prisma.CarDeleteArgs) {
    return this.prismaService.car.delete(deleteDto);
  }
}
