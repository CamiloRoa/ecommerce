import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../products/dtos/products.dto';
import { Product } from './models/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async findAll(params: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return await this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return await this.productModel.find().populate('brand').exec();
  }

  async findById(idHost: string): Promise<Product> {
    return await this.productModel.findOne({ id_host: idHost }).exec();
  }

  async create(createProduct: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProduct);
    return await newProduct.save();
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, { $set: updateProduct }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
