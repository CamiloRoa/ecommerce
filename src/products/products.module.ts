import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';

import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../repository/models/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
