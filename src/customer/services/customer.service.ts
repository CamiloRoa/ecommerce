import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomerRepository } from '../../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  findAllCustomers() {
    return this.customerRepository.findAll();
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }

  async create(createcustomer: CreateCustomerDto) {
    return this.customerRepository.create(createcustomer);
  }

  async update(id: string, updatecustomer: UpdateCustomerDto) {
    const customer = await this.customerRepository.update(id, updatecustomer);

    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }

  async remove(id: string) {
    const customer = await this.customerRepository.remove(id);

    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }
}
