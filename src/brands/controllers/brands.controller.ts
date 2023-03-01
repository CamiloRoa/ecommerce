import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { BrandsService } from '../services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandService.findAllBrands();
  }

  @Get(':brandId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.findOne(brandId);
  }

  @Post()
  create(@Body() createBrand: CreateBrandDto) {
    return this.brandService.create(createBrand);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() createBrand: UpdateBrandDto,
  ) {
    try {
      return this.brandService.update(id, createBrand);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    try {
      return this.brandService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
