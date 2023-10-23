// abstração para criptografia

export interface HashProvider {
  generate(payload: string): Promise<string>;
  // irá compará a senha com has que está armazenado no banco de dados
  compareHash(payload: string, has: string): Promise<boolean>;
}
