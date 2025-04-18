import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CarRepository } from 'src/shared/database/repositories/car.repositories';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { ValidateCarOwnershipService } from './validation-car.service';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepo: CarRepository,
    private readonly validateCarOwnershipService: ValidateCarOwnershipService,
  ) {}

  async create(userId: string, createCarDto: CreateCarDto) {
    const {
      licensePlate,
      chassis,
      renavam,
      model,
      brand,
      year,
      title,  
      categoryId    
    } = createCarDto;

    // Verifica se a placa já existe
    await this.validateUniqueFields(licensePlate, chassis, renavam);

    // Valida o ano do carro
    this.validateYear(year);

    try {
      return await this.carRepo.create({
        data: {
          userId,
          licensePlate,
          chassis,
          renavam,
          model,
          brand,
          year,
          title,
          avaliable: true,
          status: 'AVAILABLE',
          category: {
            connect: { id: categoryId }
          }
        },
        include: {
          category: true // Inclui os dados da categoria na resposta
        }
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Category ID not found');
      }
      throw error;
    }
  }

  async findAllByUserId(userId: string) {
    const posts = await this.carRepo.findMany({
      where: { userId },
    });
    return { posts };
  }

  async findOne(id: string, userId: string) {
    const post = await this.carRepo.findFirst({
      where: { id, userId },
    });
    return { post };
  }

  async update(userId: string, id: string, updateCarDto: UpdateCarDto) {
    const { licensePlate, chassis, renavam, model, brand, year } =
      updateCarDto;

    await this.validateCarOwnershipService.validade(userId, id);

    return this.carRepo.update({
      where: { id },
      data: {
        licensePlate,
        chassis,
        renavam,
        model,
        brand,
        year,        
      },
    });
  }
  async remove(userId: string, id: string) {
    await this.validateCarOwnershipService.validade(userId, id);

    await this.carRepo.delete({
      where: { userId, id },
    });

    return null;
  }

  private async validateUniqueFields(licensePlate: string, chassis: string, renavam: string) {
    const existingCar = await this.carRepo.findFirst({
      where: {
        OR: [
          { licensePlate },
          { chassis },
          { renavam }
        ]
      }
    });

    if (existingCar) {
      if (existingCar.licensePlate === licensePlate) {
        throw new ConflictException('License plate already registered');
      }
      if (existingCar.chassis === chassis) {
        throw new ConflictException('Chassis already registered');
      }
      if (existingCar.renavam === renavam) {
        throw new ConflictException('Renavam already registered');
      }
    }
  }

  private validateYear(year: string) {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year, 10);
    
    if (isNaN(yearNum) || yearNum < 2020 || yearNum > currentYear + 1) {
      throw new BadRequestException(`Invalid year. Must be between 2020 and ${currentYear + 1}`);
    }
  }
}
 