import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateSymptomDto {
  @ApiProperty({ description: 'Symptom name', example: 'Mild Bloating' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Date of symptom', example: '2025-10-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Symptom severity (1-10)', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  severity?: number;
}
