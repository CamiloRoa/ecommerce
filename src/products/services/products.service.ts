import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repository/product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAllProducts(params?: FilterProductsDto) {
    return this.productRepository.findAll(params);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(createProduct: CreateProductDto) {
    return this.productRepository.create(createProduct);
  }

  async update(id: string, updateProduct: UpdateProductDto) {
    const product = await this.productRepository.update(id, updateProduct);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.remove(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
