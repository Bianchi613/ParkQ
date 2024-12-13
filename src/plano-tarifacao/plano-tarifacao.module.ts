import { Module } from '@nestjs/common';
import { PlanoTarifacaoService } from './plano-tarifacao.service';
import { PlanoTarifacaoController } from './plano-tarifacao.controller';

@Module({
  providers: [PlanoTarifacaoService],
  controllers: [PlanoTarifacaoController]
})
export class PlanoTarifacaoModule {}
