import { Module } from '@nestjs/common';
import { EstacionamentoService } from './estacionamento.service';
import { EstacionamentoController } from './estacionamento.controller';

@Module({
  providers: [EstacionamentoService],
  controllers: [EstacionamentoController]
})
export class EstacionamentoModule {}
