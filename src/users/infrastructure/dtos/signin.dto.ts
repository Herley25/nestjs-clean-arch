import { SigninUseCase } from '@/users/application/usecases/signin.usecase';

// Dto de criação de usuário
export class SigninDto implements SigninUseCase.Input {
  email: string;
  password: string;
}
