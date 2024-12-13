import { Module } from '@nestjs/common';
import { VagaService } from './vaga.service';
import { VagaController } from './vaga.controller';

@Module({
  providers: [VagaService],
  controllers: [VagaController]
})
export class VagaModule {}
