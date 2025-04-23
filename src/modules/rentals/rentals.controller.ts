import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { RentalsService } from './rentals.service';


@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    console.log(`createRentalDto: ${JSON.stringify(createRentalDto)}`);
    
    return this.rentalsService.create(createRentalDto);
  }

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Patch(':id')
  updateRental(@Param('id') id: string, @Body() dto: UpdateRentalDto) {
    return this.rentalsService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRentalStatusDto) {
    return this.rentalsService.updateStatus(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rentalsService.remove(id);
  }
}
