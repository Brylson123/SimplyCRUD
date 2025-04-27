import { Injectable, NotFoundException } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../common/interfaces/product';
import { ProductsSchema } from './schemas/products.schema';

const ProductModel = dynamoose.model('ProductsTable', ProductsSchema);

@Injectable()
export class ProductsService {
  async getOne(id: string): Promise<Product> {
    await this.ifProductExists(id);
    return (await ProductModel.get(id)) as unknown as Product;
  }

  async getAll(): Promise<Product[]> {
    const result = await ProductModel.scan().exec();
    return result as unknown as Product[];
  }

  async create(data: CreateProductDto): Promise<Product> {
    const newProduct = new ProductModel({ id: uuid(), ...data });
    return (await newProduct.save()) as unknown as Product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    await this.ifProductExists(id);
    return (await ProductModel.update({ id }, data)) as unknown as Product;
  }

  async delete(id: string): Promise<void> {
    await this.ifProductExists(id);
    await ProductModel.delete(id);
  }

  private async ifProductExists(id: string): Promise<void> {
    const product = await ProductModel.get(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
