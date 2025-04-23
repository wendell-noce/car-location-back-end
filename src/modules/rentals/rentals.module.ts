import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService, PrismaService],
  exports: [PrismaService],
})
export class RentalsModule {}
