import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { PlanoTarifacaoService } from './plano-tarifacao.service';
import { PlanoTarifacao } from './plano-tarifacao.model';

@Controller('planos-tarifacao')
export class PlanoTarifacaoController {
  constructor(
    private readonly planoTarifacaoService: PlanoTarifacaoService,
  ) {}

  @Get()
  async findAll(): Promise<PlanoTarifacao[]> {
    try {
      return await this.planoTarifacaoService.findAll();
    } catch (error) {
      throw new Error('Erro ao listar os planos de tarifação: ' + error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PlanoTarifacao> {
    try {
      return await this.planoTarifacaoService.findOne(id);
    } catch (error) {
      throw new Error('Plano de tarifação não encontrado: ' + error.message);
    }
  }

  @Post()
  async create(@Body() planoTarifacaoData: Partial<PlanoTarifacao>): Promise<PlanoTarifacao> {
    try {
      return await this.planoTarifacaoService.create(planoTarifacaoData);
    } catch (error) {
      throw new Error('Erro ao criar plano de tarifação: ' + error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() planoTarifacaoData: Partial<PlanoTarifacao>,
  ): Promise<PlanoTarifacao> {
    try {
      return await this.planoTarifacaoService.update(id, planoTarifacaoData);
    } catch (error) {
      throw new Error('Erro ao atualizar plano de tarifação: ' + error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.planoTarifacaoService.remove(id);
    } catch (error) {
      throw new Error('Erro ao remover plano de tarifação: ' + error.message);
    }
  }

  @Post(':id/calcular-tarifa')
  async calcularTarifa(
    @Param('id') id: number,
    @Body() { tipoVaga, duracao }: { tipoVaga: string; duracao: number },
  ): Promise<number> {
    try {
      return await this.planoTarifacaoService.calcularTarifa(tipoVaga, duracao, id);
    } catch (error) {
      throw new Error('Erro ao calcular tarifa: ' + error.message);
    }
  }
}
