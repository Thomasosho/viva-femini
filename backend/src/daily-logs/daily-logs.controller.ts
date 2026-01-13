import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DailyLogsService } from './daily-logs.service';
import { CreateDailyLogDto } from './dto/create-daily-log.dto';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto';

@ApiTags('daily-logs')
@Controller('daily-logs')
export class DailyLogsController {
  constructor(private readonly dailyLogsService: DailyLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new daily log entry' })
  @ApiResponse({ status: 201, description: 'Daily log created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createDailyLogDto: CreateDailyLogDto) {
    return this.dailyLogsService.create(createDailyLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all daily logs' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date for range query (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date for range query (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'List of daily logs' })
  findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    if (startDate && endDate) {
      return this.dailyLogsService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.dailyLogsService.findAll();
  }

  @Get(':date')
  @ApiOperation({ summary: 'Get a daily log by date' })
  @ApiParam({ name: 'date', description: 'Date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Daily log found' })
  @ApiResponse({ status: 404, description: 'Daily log not found' })
  findOne(@Param('date') date: string) {
    return this.dailyLogsService.findOne(date);
  }

  @Patch(':date')
  @ApiOperation({ summary: 'Update a daily log by date' })
  @ApiParam({ name: 'date', description: 'Date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Daily log updated successfully' })
  @ApiResponse({ status: 404, description: 'Daily log not found' })
  update(@Param('date') date: string, @Body() updateDailyLogDto: UpdateDailyLogDto) {
    return this.dailyLogsService.update(date, updateDailyLogDto);
  }

  @Delete(':date')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a daily log by date' })
  @ApiParam({ name: 'date', description: 'Date in YYYY-MM-DD format' })
  @ApiResponse({ status: 204, description: 'Daily log deleted successfully' })
  @ApiResponse({ status: 404, description: 'Daily log not found' })
  remove(@Param('date') date: string) {
    return this.dailyLogsService.remove(date);
  }
}
