import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsArray, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateCycleDto {
  @ApiProperty({ description: 'Cycle start date', example: '2025-10-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Cycle end date', example: '2025-10-28' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Cycle length in days', example: 28, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  cycleLength?: number;

  @ApiProperty({ description: 'Period length in days', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  periodLength?: number;

  @ApiProperty({ description: 'List of symptoms', example: ['Bloating', 'Cramps'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @ApiProperty({ description: 'Average flow intensity', example: 'medium', enum: ['light', 'medium', 'heavy'], required: false })
  @IsOptional()
  @IsString()
  averageFlow?: string;
}
