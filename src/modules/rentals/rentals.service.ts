import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createDto: CreateRentalDto) {
    try {
      // 1. Buscar o carro para pegar o valor da diária
      const car = await this.prisma.car.findUnique({
        where: { id: createDto.carId },
      });

      if (!car) {
        return {
          success: false,
          message: "Carro não encontrado",
        };
      }

      // Marca o carro como indisponível
      await this.prisma.car.update({
        where: { id: car.id },
        data: {
          status: 'UNAVAILABLE',
        },
      });

      // 2. Calcular o número de dias
      const startDate = new Date(createDto.startDate);
      const endDate = new Date(createDto.endDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (numberOfDays <= 0) {
        return {
          success: false,
          message: "A data final deve ser posterior à data inicial",
        };
      }

      // 3. Calcular o total
      const totalPrice = numberOfDays * car.dailyRate;
      
      // 4. Criar o aluguel
      const createdRental = await this.prisma.rental.create({
        data: {
          userId: createDto.userId,
          carId: createDto.carId,
          startDate,
          endDate,
          totalPrice,
          status: createDto.status ?? "PENDING",
        },
      });

      return {
        success: true,
        message: "Aluguel criado com sucesso!",
        data: createdRental,
      };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao criar aluguel",
        error: error.message,
      };
    }
  }

  findAll() {
    return `This action returns all rentals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  async update(id: string, data: UpdateRentalDto) {
    try {
      const updated = await this.prisma.rental.update({
        where: { id },
        data,
      });
  
      return {
        success: true,
        message: 'Aluguel atualizado com sucesso!',
        data: updated,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar aluguel',
        error: error.message,
      };
    }
  }

  async updateStatus(rentalId: string, status: UpdateRentalStatusDto) {
    try {
      const updatedRental = await this.prisma.rental.update({
        where: { id: rentalId },
        data: { status: status.status },
      });

      if (status.status === "CANCELLED") {
        const car = await this.prisma.car.findUnique({
          where: { id: updatedRental.carId },
        });

        await this.prisma.car.update({
          where: { id: car.id },
          data: {
            status: 'AVALIABLE',
          },
        });
      }
  
      return {
        success: true,
        message: `Aluguel ${status.status === "ACTIVE" ? "ativado" : "cancelado"} com sucesso!`,
        data: updatedRental,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar status do aluguel',
        error: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.rental.delete({
        where: { id },
      });
  
      return {
        success: true,
        message: 'Aluguel deletado com sucesso!',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao deletar aluguel',
        error: error.message,
      };
    }
  }
}
