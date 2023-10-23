import { HashProvider } from '@/shared/application/providers/hash-provider';
import { compare, hash } from 'bcryptjs';

// Criação do método para criptografia de senha
export class BcryptjsHashProvider implements HashProvider {
  generate(payload: string): Promise<string> {
    return hash(payload, 6);
  }
  compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}
