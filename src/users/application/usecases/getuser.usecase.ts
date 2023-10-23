/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

// Caso de uso para exibir os dados de um usuário
export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

  //Criação do método
  export class UseCase implements DefaultUseCase<Input, Output> {
    // injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return entity.toJSON();
    }
  }
}
