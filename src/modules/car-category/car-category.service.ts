import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CarCategoryRepository } from 'src/shared/database/repositories/car-category.repositories';
import { CarRepository } from 'src/shared/database/repositories/car.repositories';
import { CreateCarCategoryDto } from './dto/create-car-category.dto';
import { UpdateCarCategoryDto } from './dto/update-car-category.dto';

@Injectable()
export class CarCategoryService {

  constructor(
    private readonly carCategoryRepo: CarCategoryRepository,
    private readonly carRepo: CarRepository
  ) {}

  async create(createCarCategoryDto: CreateCarCategoryDto) {
    const { name, description } = createCarCategoryDto;
    await this.validateUniqueCategory(name);

    const result = await this.carCategoryRepo.create({
      data: {
        name,
        description,
      },
    }); ;

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    
    return result;  
  }

  findAll() {
    return `This action returns all carCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carCategory`;
  }

  async update(id: string, updateCarCategoryDto: UpdateCarCategoryDto) {
    const { name, description } = updateCarCategoryDto;
    const result = await this.carCategoryRepo.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
  }

  async remove(id: string) {
    const cars = await this.carRepo.findMany({
      where: { categoryId: id },
    });

    if (cars.length > 0) {
      throw new BadRequestException(
        "Esta categoria possui carros vinculados e não pode ser removida."
      );
    }

    const result = await this.carCategoryRepo.delete({
      where: { id },
    });

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  private async validateUniqueCategory(name: string) {
    const existingCategory = await this.carCategoryRepo.findFirst({
      where: { name },
    });
    
    
  
    if (existingCategory) {
      console.log('existingCategory', existingCategory);
      throw new ConflictException('Category name already registered');
    }
  }
}
