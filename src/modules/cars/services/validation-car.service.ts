import { Injectable, NotFoundException } from '@nestjs/common';
import { CarRepository } from 'src/shared/database/repositories/car.repositories';

@Injectable()
export class ValidateCarOwnershipService {
  constructor(private readonly carRepo: CarRepository) {}

  async validade(userId: string, carId: string) {
    const isOwnser = await this.carRepo.findFirst({
      where: { userId, id: carId },
    });

    if (!isOwnser) {
      throw new NotFoundException('Car not found');
    }
  }
}
