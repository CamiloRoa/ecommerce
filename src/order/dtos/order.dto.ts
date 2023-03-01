import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly order_id: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly order_date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}
