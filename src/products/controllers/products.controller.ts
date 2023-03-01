import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  BadRequestException,
  // ParseIntPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAllProducts(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() createProduct: UpdateProductDto,
  ) {
    try {
      return this.productsService.update(id, createProduct);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    try {
      return this.productsService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
