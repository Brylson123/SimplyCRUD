import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiErrorResponse } from '../common/interfaces/response';
import { Product } from '../common/interfaces/product';
import {
  ApiResponse as SwaggerApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @SwaggerApiResponse({
    status: 200,
    description: 'List of products',
    type: [CreateProductDto],
  })
  async getAll(): Promise<ApiResponse<Product[]> | ApiErrorResponse> {
    try {
      const products = await this.productsService.getAll();
      return {
        success: true,
        data: products,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        { success: false, error: 'Failed to fetch products' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Product found',
    type: CreateProductDto,
  })
  async getOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<Product> | ApiErrorResponse> {
    try {
      const product = await this.productsService.getOne(id);
      if (!product) {
        throw new HttpException(
          { success: false, error: 'Product not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        data: product,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new HttpException(
        { success: false, error: 'Failed to fetch product' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @SwaggerApiResponse({
    status: 201,
    description: 'Product created',
    type: CreateProductDto,
  })
  async createProduct(
    @Body() data: CreateProductDto,
  ): Promise<ApiResponse<Product> | ApiErrorResponse> {
    try {
      const createdProduct = await this.productsService.create(data);
      return {
        success: true,
        message: 'Product created successfully',
        data: createdProduct,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        { success: false, error: 'Failed to create product' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Product updated',
    type: UpdateProductDto,
  })
  async editProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<ApiResponse<Product> | ApiErrorResponse> {
    try {
      const updatedProduct = await this.productsService.update(id, data);
      return {
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new HttpException(
        { success: false, error: 'Failed to update product' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @SwaggerApiResponse({ status: 200, description: 'Product deleted' })
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<ApiResponse<null> | ApiErrorResponse> {
    try {
      await this.productsService.delete(id);
      return {
        success: true,
        message: 'Product deleted successfully',
        data: null,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new HttpException(
        { success: false, error: 'Failed to delete product' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
