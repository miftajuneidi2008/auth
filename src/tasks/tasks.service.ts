import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllForUser(userId: string) {
    return this.databaseService.task.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async create(userId: string, dto: CreateTaskDto) {
    const task = await this.databaseService.task.create({
      data: {
        ...dto,
        userId: userId,
      },
    });

    return task;
  }

  async update(id: string, userId: string, data: Partial<CreateTaskDto>) {
    const task = await this.databaseService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not own this task');
    }
    const updated = await this.databaseService.task.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updated;
  }

  async delete(id: string, userId: string) {
    const task = await this.databaseService.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('You do not own this task');
    }

    await this.databaseService.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }
}
