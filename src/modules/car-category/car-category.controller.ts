import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarCategoryService } from './car-category.service';
import { CreateCarCategoryDto } from './dto/create-car-category.dto';
import { UpdateCarCategoryDto } from './dto/update-car-category.dto';

@Controller('car-category')
export class CarCategoryController {
  constructor(private readonly carCategoryService: CarCategoryService) {}

  @Post('add-category')
  create(@Body() createCarCategoryDto: CreateCarCategoryDto) {
    console.log('createCarCategoryDto', createCarCategoryDto);
    return this.carCategoryService.create(createCarCategoryDto);
  }

  @Get()
  findAll() {
    return this.carCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarCategoryDto: UpdateCarCategoryDto) {
    return this.carCategoryService.update(id, updateCarCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carCategoryService.remove(id);
  }
}
