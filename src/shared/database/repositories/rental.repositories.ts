import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RentalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.RentalCreateArgs) {

    try{
      const rentalAdd = await this.prismaService.rental.create(createDto);
      return {
        success: false,
        message: 'Erro ao alugar carro',
        rental: rentalAdd,
      };          

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de violação de constraint única
        if (error.code === 'P2002') {
          return {
            success: false,
            message:
              "Já existe uma locação para esse carro!",
            error: error.meta,
          };
        }
        
        // Outros erros conhecidos do Prisma
        return {
          success: false,
          message: 'Erro ao alugar carro',
          error: error.message
        };
      }

      // Erros genéricos
      return {
        success: false,
        message: 'Ocorreu um erro inesperado',
        error: error.message
      };
    }     
  }

  findFirst(findFirstDto: Prisma.RentalFindFirstArgs) {
    return this.prismaService.rental.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.RentalFindUniqueArgs) {
    return this.prismaService.rental.findUnique(findUniqueDto);
  }

  update(updateData: Prisma.RentalUpdateArgs) {
    return this.prismaService.rental.update(updateData);
  }
}
