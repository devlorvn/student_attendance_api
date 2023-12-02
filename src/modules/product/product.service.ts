import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { loadEntityManager } from 'src/common/helpers/loadEntityManager.helper';
import { Product } from './entities/product.entity.mongo';

@Injectable()
export class ProductService {
  constructor(private readonly moduleRef: ModuleRef) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(systemId: string) {
    try {
      const entityManager = await loadEntityManager(systemId, this.moduleRef);
      if (!entityManager) {
        return [];
      }
      return entityManager.find(Product);
    } catch (error) {
      console.log(error);
    }
  }
  loadEntityManager(systemId: string) {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
