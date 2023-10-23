/* eslint-disable @typescript-eslint/no-namespace */
//* abordado o conceito do solid, responsabilidade única
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutput } from '../dtos/user-output';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase {
    // injeção de dependência
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input;
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }
      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generate(password);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );

      //fazer a inserção dos dados no repositório
      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}
