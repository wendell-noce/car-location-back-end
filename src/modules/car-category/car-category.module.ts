import { Module } from '@nestjs/common';
import { CarCategoryService } from './car-category.service';
import { CarCategoryController } from './car-category.controller';

@Module({
  controllers: [CarCategoryController],
  providers: [CarCategoryService],
})
export class CarCategoryModule {}
