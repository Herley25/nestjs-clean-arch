import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Implementação do PrismaService
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  //* quando a conexão é destruida
  async onModuleDestroy() {
    await this.$disconnect;
  }

  //* quando o módulo é iniciado
  async onModuleInit() {
    await this.$connect();
  }
}
