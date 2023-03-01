import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../../repository/brand.repository';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly brandRepository: BrandRepository) {}

  findAllBrands() {
    return this.brandRepository.findAll();
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(createBrand: CreateBrandDto) {
    return this.brandRepository.create(createBrand);
  }

  async update(id: string, updateBrand: UpdateBrandDto) {
    const brand = await this.brandRepository.update(id, updateBrand);

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandRepository.remove(id);

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }
}
