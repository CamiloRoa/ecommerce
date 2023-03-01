import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createorderDto: CreateOrderDto) {
    return this.orderService.create(createorderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateorderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }
}
