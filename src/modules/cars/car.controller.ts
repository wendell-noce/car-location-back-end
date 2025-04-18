import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ActiveUserId } from 'src/shared/decorators/activeUserId';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarService } from './services/car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(userId, createCarDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.carService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.carService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(userId, id, updateCarDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.carService.remove(userId, id);
  }
}
