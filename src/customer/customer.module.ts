import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../repository/models/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
