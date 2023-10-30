import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase';

// Dto de atualização de usuário
export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  name: string;
}
