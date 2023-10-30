import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/signup.usecase';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { BcryptjsHashProvider } from './providers/hash-provider/bcriptjs-hash.provider';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';

@Module({
  controllers: [UsersController],
  // Antes de registrar as classes, tem que registrar as dependências
  providers: [
    UsersService,
    // implementação de recursos terceiros, pode haver possíveis mudanças
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    // faz parte da regra de negócio
    // Registro no container de casos de uso recebendo as dependências necessárias
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UsersModule {}
