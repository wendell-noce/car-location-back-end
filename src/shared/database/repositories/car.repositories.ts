import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.CarCreateArgs) {
    try{
      const createdCar = await this.prismaService.car.create(createDto);
    
      // Verifica se o carro foi criado com sucesso
      if (createdCar) {
        return {
          success: true,
          message: 'Carro adicionado com sucesso!',        
        };
      } else {
        return {
          success: false,
          message: 'Erro ao adicionar carro',
        };
      }

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de violação de constraint única
        if (error.code === 'P2002') {
          return {
            success: false,
            message: 'Já existe uma carro com esses dados',
            error: error.meta
          };
        }
        
        // Outros erros conhecidos do Prisma
        return {
          success: false,
          message: 'Erro ao adicionar carro',
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

  findFirst(findFirstDto: Prisma.CarFindFirstArgs) {
    return this.prismaService.car.findFirst(findFirstDto);
  }

  findMany<T extends Prisma.CarFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.CarFindManyArgs>,
  ) {
    return this.prismaService.car.findMany(findManyDto);
  }

  async update(updateDto: Prisma.CarUpdateArgs) {
    try {
      const updatedCar = await this.prismaService.car.update(updateDto);
    
      // Verifica se o carro foi atualizado com sucesso
      if (updatedCar) {
        return {
          success: true,
          message: 'Carro atualizado com sucesso!',        
        };
      } else {
        return {
          success: false,
          message: 'Erro ao atualizar carro',
        };
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de violação de constraint única
        if (error.code === 'P2002') {
          return {
            success: false,
            message: 'Já existe uma carro com esses dados',
            error: error.meta
          };
        }
        
        // Outros erros conhecidos do Prisma
        return {
          success: false,
          message: 'Erro ao atualizar carro',
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
  async delete(deleteDto: Prisma.CarDeleteArgs) {
    try {
      console.log('deleteDto', deleteDto);
      
      const deletedCar = await this.prismaService.car.delete(deleteDto);
      if (deletedCar) {
        return {
          success: true,
          message: 'Carro deletado com sucesso!',        
        };
      }

    } catch (error) {
      return {
        success: false,
        message: 'Erro ao deletar carro',
        error: error.message,
      };
    }
  }
}
