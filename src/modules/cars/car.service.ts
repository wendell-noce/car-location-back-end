import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CarRepository } from 'src/shared/database/repositories/car.repositories';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepo: CarRepository
  ) {}

  async create(createCarDto: CreateCarDto) {
    const {
      licensePlate,
      chassis,
      renavam,
      model,
      brand,
      dailyRate,
      year,      
      categoryId,    
      imageUrl
    } = createCarDto;

    // Verifica se a placa já existe
    await this.validateUniqueFields(licensePlate, chassis, renavam);

    // Valida o ano do carro
    this.validateYear(year);
    
    const result = await this.carRepo.create({
      data: {          
        licensePlate,
        chassis,
        renavam,
        model,
        brand,
        year,          
        dailyRate,     
        imageUrl,   
        status: 'AVALIABLE',
        category: {
          connect: { id: categoryId }
        }
      },
      include: {
        category: true // Inclui os dados da categoria na resposta
      }
    });

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    
    return result;
  }

  async findOne(id: string) {
    const post = await this.carRepo.findFirst({
      where: { id },
    });
    return { post };
  }

  async findAll() {
    const cars = await this.carRepo.findMany(
      {
        orderBy: {
          createdAt: 'desc',
        },
      }
    );
    return { cars };
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const { 
      licensePlate, 
      chassis, 
      renavam, 
      model, 
      brand, 
      dailyRate,
      categoryId,
      status,      
      year } =
      updateCarDto;

    const result =  await this.carRepo.update({
      where: { id },
      data: {
        licensePlate,
        chassis,
        renavam,
        model,
        brand,
        year,        
        dailyRate,        
        status,
        category: {
          connect: { id: categoryId }
        },
      },
    });

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
    
  }
  async remove( id: string) {
    
    const result = await this.carRepo.delete({
      where: { id },
    });

    console.log('result', result);
    

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
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
    console.log('existingCar', existingCar);
    
    if (existingCar) {
      if (existingCar.licensePlate === licensePlate) {
        throw new ConflictException(
          "Já existe um carro cadastrado com a mesma placa"
        );
      }
      if (existingCar.chassis === chassis) {
        throw new ConflictException('Já existe um carro cadastrado com o mesmo chassi');
      }
      if (existingCar.renavam === renavam) {
        throw new ConflictException('Já existe um carro cadastrado com o mesmo renavam');
      }
    }
  }

  private validateYear(year: string) {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year, 10);
    
    if (isNaN(yearNum) || yearNum < 2020 || yearNum > currentYear) {
      throw new BadRequestException(
        `O ano do carro deve estar entre 2020 e o ano atual, o ano atual é ${currentYear}`
      );
    }
  }
}
 