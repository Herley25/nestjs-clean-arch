/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserModelMapper } from './models/user-model.mapper';

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[];

  constructor(private prismaService: PrismaService) {}

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  emailExists(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    throw new Error('Method not implemented.');
  }

  insert(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<UserEntity> {
    return this._get(id);
  }

  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // recursos do prisma
  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      return UserModelMapper.toEntity(user);
    } catch {
      throw new NotFoundError(`UserModek not found usind ID ${id}`);
    }
  }
}
