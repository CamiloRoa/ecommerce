import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.schema';
import { Product } from './product.schema';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, unique: true })
  order_id: string;

  @Prop({ type: Date })
  order_date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
