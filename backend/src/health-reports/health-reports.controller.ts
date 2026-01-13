import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { HealthReportsService } from './health-reports.service';

@ApiTags('health-reports')
@Controller('health-reports')
export class HealthReportsController {
  constructor(private readonly healthReportsService: HealthReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all health reports' })
  @ApiResponse({ status: 200, description: 'List of health reports' })
  findAll() {
    return this.healthReportsService.getAllReports();
  }

  @Get(':month/:year')
  @ApiOperation({ summary: 'Get a health report for a specific month and year' })
  @ApiParam({ name: 'month', description: 'Month (1-12)' })
  @ApiParam({ name: 'year', description: 'Year (e.g., 2025)' })
  @ApiResponse({ status: 200, description: 'Health report found' })
  async getReport(@Param('month') month: string, @Param('year') year: string) {
    return this.healthReportsService.getReport(parseInt(month), parseInt(year));
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a health report for a specific month and year' })
  @ApiQuery({ name: 'month', description: 'Month (1-12)', required: true })
  @ApiQuery({ name: 'year', description: 'Year (e.g., 2025)', required: true })
  @ApiResponse({ status: 201, description: 'Health report generated successfully' })
  async generateReport(@Query('month') month: string, @Query('year') year: string) {
    return this.healthReportsService.generateReport(parseInt(month), parseInt(year));
  }
}
