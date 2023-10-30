import { UpdatePasswordUseCase } from '@/users/application/usecases/update-password.usecase.ts';

// Dto de atualização de senha
export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  password: string;
  oldPassword: string;
}
