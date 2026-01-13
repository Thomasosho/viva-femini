import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsArray, IsNumber, IsString, Min, Max, IsBoolean } from 'class-validator';

export class CreateDailyLogDto {
  @ApiProperty({ description: 'Date of the log entry', example: '2025-10-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'List of symptoms', example: ['Mild Bloating', 'Cravings'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @ApiProperty({ description: 'Flow intensity on a scale of 1-10', example: 3, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  flowIntensity?: number;

  @ApiProperty({ description: 'Notes for the day', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Health activities performed', example: ['Pilates'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  healthActivities?: string[];

  @ApiProperty({ description: 'Whether this is a period day', required: false })
  @IsOptional()
  @IsBoolean()
  isPeriodDay?: boolean;
}
