/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import { execSync } from 'node:child_process';
import { UserModelMapper } from '../../user-model.mapper';
import { ValidationError } from '@/users/domain/errors/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';

describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    execSync(
      'npx dotenv-cli -e .env.test -- npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma',
    );
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
    props = {
      id: 'k3445564-h345-4k65-a3a4-34d8f5h0b89a',
      name: 'Test name',
      email: 'test@test.com',
      password: '123456',
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    const object = await prismaService;
    if (object !== undefined) {
      object.$disconnect();
    }
  });

  it('should throw error when user model is invalid', () => {
    const model: User = Object.assign(props, { name: null });
    expect(() => UserModelMapper.toEntity(model)).toThrowError(ValidationError);
  });

  it('should convert a user model to a user entity', async () => {
    const model: User = await prismaService.user.create({
      data: props,
    });
    const sut = UserModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
