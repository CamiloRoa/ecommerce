import { Module } from '@nestjs/common';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '../repository/models/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
