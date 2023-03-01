import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { OrderRepository } from '../../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  findAllOrders() {
    return this.orderRepository.findAll();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return order;
  }

  async create(createOrder: CreateOrderDto) {
    return this.orderRepository.create(createOrder);
  }

  async update(id: string, updateOrder: UpdateOrderDto) {
    const order = await this.orderRepository.update(id, updateOrder);

    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return order;
  }

  async remove(id: string) {
    const order = await this.orderRepository.remove(id);

    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return order;
  }

  async removeProduct(id: string, productId: string) {
    return await this.orderRepository.removeProduct(id, productId);
  }
}
