import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../customer/dtos/customer.dto';
import { Customer } from './models/customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<Customer>,
  ) {}

  async findAll() {
    return await this.customerModel.find().exec();
  }

  async findById(idHost: string): Promise<Customer> {
    return await this.customerModel.findOne({ id_host: idHost }).exec();
  }

  async create(createCustomer: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomer);
    return await newCustomer.save();
  }

  async update(
    id: string,
    updateCustomer: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.customerModel
      .findByIdAndUpdate(id, { $set: updateCustomer }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Customer> {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
