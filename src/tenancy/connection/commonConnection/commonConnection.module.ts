import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const connectionFactory: FactoryProvider = {
  provide: 'COMMON_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async () => {
    return new PrismaClient({
      datasources: {
        db: {
          url: 'postgresql://postgres:postgres@localhost:5432/test?schema=public',
        },
      },
    });
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['COMMON_CONNECTION'],
})
export class CommonConnectionModule {}
