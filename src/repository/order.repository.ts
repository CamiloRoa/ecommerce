import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../order/dtos/order.dto';
import { Order } from './models/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async findAll() {
    return await this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findById(idHost: string): Promise<Order> {
    return await this.orderModel.findOne({ id_host: idHost }).exec();
  }

  async create(createOrder: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrder);
    return await newOrder.save();
  }

  async update(id: string, updateOrder: UpdateOrderDto): Promise<Order> {
    return await this.orderModel
      .findByIdAndUpdate(id, { $set: updateOrder }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndRemove(id);
  }

  async removeProduct(id: string, productId: string): Promise<Order> {
    const order = await this.findById(id);
    order.products.pull(productId);
    return order.save();
  }
}
