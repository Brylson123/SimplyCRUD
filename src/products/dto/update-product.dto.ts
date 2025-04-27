import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  @IsString()
  brand?: string;
  @ApiProperty()
  @IsNumber()
  price?: number;
  @ApiProperty()
  @IsString()
  description?: string;
}
