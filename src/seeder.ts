import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './products/models/product.model';
import { ProductsSeeder } from './products/seed/products.seed';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
}).run([ProductsSeeder]);
