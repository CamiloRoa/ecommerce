import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBrandDto, UpdateBrandDto } from '../brands/dtos/brand.dto';

import { Brand } from './models/brand.schema';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel('Brand')
    private readonly brandModel: Model<Brand>,
  ) {}

  async findAll() {
    return await this.brandModel.find().exec();
  }

  async findById(idHost: string): Promise<Brand> {
    return await this.brandModel.findOne({ id_host: idHost }).exec();
  }

  async create(createBrand: CreateBrandDto): Promise<Brand> {
    const newBrand = new this.brandModel(createBrand);
    return await newBrand.save();
  }

  async update(id: string, updateBrand: UpdateBrandDto): Promise<Brand> {
    return await this.brandModel
      .findByIdAndUpdate(id, { $set: updateBrand }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Brand> {
    return await this.brandModel.findByIdAndRemove(id);
  }
}
