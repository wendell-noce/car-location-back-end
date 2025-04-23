import { Module } from '@nestjs/common';
import { CarCategoryController } from './car-category.controller';
import { CarCategoryService } from './car-category.service';

@Module({
  controllers: [CarCategoryController],
  providers: [CarCategoryService],
})
export class CarCategoryModule {}
