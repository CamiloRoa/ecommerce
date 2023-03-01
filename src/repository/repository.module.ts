import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.schema';
import { ProductRepository } from './product.repository';
import { BrandSchema } from './models/brand.schema';
import { BrandRepository } from './brand.repository';
import { CustomerSchema } from './models/customer.schema';
import { CustomerRepository } from './customer.repository';
import { OrderSchema } from './models/order.schema';
import { OrderRepository } from './order.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Brand', schema: BrandSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  exports: [
    ProductRepository,
    BrandRepository,
    CustomerRepository,
    OrderRepository,
  ],
  providers: [
    ProductRepository,
    BrandRepository,
    CustomerRepository,
    OrderRepository,
  ],
})
export class RepositoryModule {}
