/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';

// Caso de uso para exibir os dados de um usuário
export namespace ListUsersUseCase {
  export type Input = SearchInput;

  export type Output = void;

  //Criação do método
  export class UseCase implements DefaultUseCase<Input, Output> {
    // injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);
      return;
    }
  }
}
