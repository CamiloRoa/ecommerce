import { User } from './user.entity';
import { Product } from '../../repository/models/product.schema';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
