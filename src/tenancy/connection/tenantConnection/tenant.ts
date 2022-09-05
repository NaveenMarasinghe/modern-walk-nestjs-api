import { Module } from '@nestjs/common';

class DevelopmentConfigService {}
class ProductionConfigService {}
class ConfigService {}

const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
