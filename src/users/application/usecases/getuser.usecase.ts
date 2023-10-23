/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput } from '../dtos/user-output';

// Caso de uso para exibir os dados de um usuário
export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

  //Criação do método
  export class UseCase {
    // injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      return entity.toJSON();
    }
  }
}
