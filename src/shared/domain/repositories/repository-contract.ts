import { Entity } from '../entities/entity';

//* interface do repositório em InMemory
export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(entity: string): Promise<void>;
}
