import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contract';
import { ListUsersUseCase } from '@/users/application/usecases/listusers.usecase';

// Dto para listagem de usuários
export class ListUsersDto implements ListUsersUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
