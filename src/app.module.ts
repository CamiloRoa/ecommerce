import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { RepositoryModule } from './repository/repository.module';
import { config, validationSchema } from './config';

import { DatabaseModule } from './database/database.module';
import { environments } from './enviroments';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    RepositoryModule,
    BrandsModule,
    CustomerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const task = await firstValueFrom(
    //       http.get('https://jsonplaceholder.typicode.com/todos'),
    //     );
    //     return task.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
