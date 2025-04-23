import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum CarStatus {
  AVAILABLE = 'AVALIABLE',
  UNAVAILABLE = 'UNAVAILABLE',  
}

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @IsOptional()
  @IsString()
  chassis?: string;

  @IsOptional()
  @IsString()
  renavam?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsNumber()
  dailyRate?: number;

  @IsOptional()
  @IsEnum(CarStatus)
  status?: CarStatus;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
