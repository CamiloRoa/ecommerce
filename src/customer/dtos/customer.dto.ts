import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
