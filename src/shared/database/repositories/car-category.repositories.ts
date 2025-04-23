import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.CarCategoryCreateArgs) {
    try {
      const createdCategory = await this.prismaService.carCategory.create(createDto);
      
      return {
        success: true,
        message: 'Categoria de carro criada com sucesso!',
        data: createdCategory
      };
    } catch (error) {
      // Tratamento específico para erros do Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de violação de constraint única
        if (error.code === 'P2002') {
          return {
            success: false,
            message: 'Já existe uma categoria com esses dados',
            error: error.meta
          };
        }
        
        // Outros erros conhecidos do Prisma
        return {
          success: false,
          message: 'Erro ao criar categoria de carro',
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

  findFirst(findFirstDto: Prisma.CarCategoryFindFirstArgs) {
    return this.prismaService.carCategory.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.CarCategoryFindUniqueArgs) {
    return this.prismaService.carCategory.findUnique(findUniqueDto);
  }

  async update(updateData: Prisma.CarCategoryUpdateArgs) {
    try {
      await this.prismaService.carCategory.update(updateData);
      
      return {
        success: true,
        message: 'Categoria atualizada com sucesso!',        
      };

    } catch (error) {
      // Tratamento específico para erros do Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Erro de violação de constraint única
        if (error.code === 'P2002') {
          return {
            success: false,
            message: 'Já existe uma categoria com esses dados',
            error: error.meta
          };
        }
        
        // Outros erros conhecidos do Prisma
        return {
          success: false,
          message: 'Erro ao atualizar categoria de carro',
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

  async delete(deleteData: Prisma.CarCategoryDeleteArgs) {
    try {
      await this.prismaService.carCategory.delete(deleteData);
      
      return {
        success: true,
        message: 'Categoria deletada com sucesso!',        
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao deletar categoria de carro',
        error: error.message,
      };
    }
  }
}
