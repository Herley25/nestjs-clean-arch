/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = UserOutput;

  //Criação do método
  export class UseCase implements DefaultUseCase<Input, Output> {
    // injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('Name note provid');
      }
      // garantido que foi atualizado
      const entity = await this.userRepository.findById(input.id);
      entity.update(input.name);
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
