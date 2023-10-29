/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

// Caso de uso para exclusão de usuário
export namespace DeleteUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  //Criação do método
  export class UseCase implements DefaultUseCase<Input, Output> {
    // injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id);
    }
  }
}
