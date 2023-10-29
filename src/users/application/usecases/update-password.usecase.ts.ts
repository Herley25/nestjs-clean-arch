/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';

// casos de uso para alteração de senha de usuário
export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserOutput;

  //Criação do método
  export class UseCase implements DefaultUseCase<Input, Output> {
    // injeção de dependência
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      // garante que o usuário existe
      const entity = await this.userRepository.findById(input.id);
      // validação da senha
      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        );
      }
      // verficação da senha antiga, se está correta.
      const checkOldPassword = await this.hashProvider.compareHash(
        input.oldPassword,
        entity.password,
      );

      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not match');
      }

      // Permissão que a senha seja atualizada
      const hashPassword = await this.hashProvider.generate(input.password);
      entity.updatePassword(hashPassword);
      // Salvar a atualização no banco de dados
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
