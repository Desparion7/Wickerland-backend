import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsFilterDto } from './dto/query-products-filter.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() query: ProductsFilterDto) {
    return this.productsService.getProducts(query);
  }
  @Get('/:pid')
  getProductByPid(@Param('pid') pid: string) {
    return this.productsService.getProductByPid(pid);
  }
}
