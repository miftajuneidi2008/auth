import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { User } from '../generated/prisma/client.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks for current user' })
  findAll(@CurrentUser() user: User) {
    return this.taskService.findAllForUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Get All tasks for current user ' })
  create(@CurrentUser() user: User, @Body() dto: CreateTaskDto) {
    return this.taskService.create(user.id, dto);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update Task' })
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: Partial<CreateTaskDto>,
  ) {
    return this.taskService.update(id, user.id, dto);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Task' })
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.taskService.delete(id, user.id);
  }
}
