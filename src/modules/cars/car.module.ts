import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';
import { ValidateCarOwnershipService } from './services/validation-car.service';

@Module({
  controllers: [CarController],
  providers: [CarService, ValidateCarOwnershipService],
  exports: [ValidateCarOwnershipService],
})
export class CarModule {}
