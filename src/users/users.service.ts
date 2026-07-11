import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }
  async findById(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }
  async create(data: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data,
    });
  }
  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }
  async fidAll() {
    return this.databaseService.user.findMany();
  }
  async delete(id: string) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
