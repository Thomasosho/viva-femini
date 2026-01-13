import { Controller, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({ summary: 'Seed the database with sample data' })
  @ApiResponse({ status: 201, description: 'Database seeded successfully' })
  async seed() {
    return this.seedService.seedAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all data from the database' })
  @ApiResponse({ status: 200, description: 'Database cleared successfully' })
  async clear() {
    return this.seedService.clearAll();
  }
}
