import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum RentalStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateRentalDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  carId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsEnum(RentalStatus)
  status?: RentalStatus;
}