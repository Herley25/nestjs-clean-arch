import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contract';

// Tipagem do casos de uso de listagem
export type SearchInput<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};
