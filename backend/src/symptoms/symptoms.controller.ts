import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SymptomsService } from './symptoms.service';

@ApiTags('symptoms')
@Controller('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all unique symptoms' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date for range query (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date for range query (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'List of symptoms or symptom frequency' })
  findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    if (startDate && endDate) {
      return this.symptomsService.getSymptomsByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.symptomsService.getAllSymptoms();
  }
}
