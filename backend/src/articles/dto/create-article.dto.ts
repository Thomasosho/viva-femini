import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: 'Article title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Article description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Article image URL' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'Article content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Article author', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ description: 'Article category', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Article URL', required: false })
  @IsOptional()
  @IsString()
  url?: string;
}
