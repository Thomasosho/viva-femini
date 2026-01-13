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
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@ApiTags('cycles')
@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cycle' })
  @ApiResponse({ status: 201, description: 'Cycle created successfully' })
  create(@Body() createCycleDto: CreateCycleDto) {
    return this.cyclesService.create(createCycleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cycles' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date for range query (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date for range query (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'List of cycles' })
  findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    if (startDate && endDate) {
      return this.cyclesService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.cyclesService.findAll();
  }

  @Get('current')
  @ApiOperation({ summary: 'Get the current active cycle' })
  @ApiResponse({ status: 200, description: 'Current cycle' })
  findCurrent() {
    return this.cyclesService.findCurrentCycle();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cycle by ID' })
  @ApiParam({ name: 'id', description: 'Cycle ID' })
  @ApiResponse({ status: 200, description: 'Cycle found' })
  @ApiResponse({ status: 404, description: 'Cycle not found' })
  findOne(@Param('id') id: string) {
    return this.cyclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cycle' })
  @ApiParam({ name: 'id', description: 'Cycle ID' })
  @ApiResponse({ status: 200, description: 'Cycle updated successfully' })
  update(@Param('id') id: string, @Body() updateCycleDto: UpdateCycleDto) {
    return this.cyclesService.update(id, updateCycleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cycle' })
  @ApiParam({ name: 'id', description: 'Cycle ID' })
  @ApiResponse({ status: 204, description: 'Cycle deleted successfully' })
  remove(@Param('id') id: string) {
    return this.cyclesService.remove(id);
  }
}
