import { prisma } from '@/lib/db';
import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaModel = keyof PrismaClient;

export interface IBaseRepository<T> {
  findAll(options?: any): Promise<T[]>;
  findById(id: string, options?: any): Promise<T | null>;
  findOne(where: any, options?: any): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
  count(where?: any): Promise<number>;
}

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly model: any) {}

  async findAll(options?: any): Promise<T[]> {
    return this.model.findMany(options);
  }

  async findById(id: string, options?: any): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
      ...options,
    });
  }

  async findOne(where: any, options?: any): Promise<T | null> {
    return this.model.findFirst({
      where,
      ...options,
    });
  }

  async create(data: any): Promise<T> {
    return this.model.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where?: any): Promise<number> {
    return this.model.count({
      where,
    });
  }

  protected async transaction<U>(fn: (tx: Prisma.TransactionClient) => Promise<U>): Promise<U> {
    return prisma.$transaction(fn);
  }
} 