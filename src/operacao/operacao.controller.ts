import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OperacaoService } from './operacao.service';
import { Operacao } from './operacao.model';

@Controller('operacoes')
export class OperacaoController {
  constructor(private readonly operacaoService: OperacaoService) {}

  @Post()
  async create(
    @Body('descricao') descricao: string,
    @Body('data_hora') data_hora: Date,
    @Body('id_usuario') id_usuario: number,
  ): Promise<Operacao> {
    try {
      return await this.operacaoService.create(descricao, data_hora, id_usuario);
    } catch (error) {
      throw new Error(`Erro ao criar operação: ${error.message}`);
    }
  }

  @Get()
  async findAll(): Promise<Operacao[]> {
    try {
      return await this.operacaoService.findAll();
    } catch (error) {
      throw new Error(`Erro ao recuperar as operações: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Operacao> {
    try {
      return await this.operacaoService.findOne(id);
    } catch (error) {
      throw new Error(`Erro ao recuperar operação: ${error.message}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('descricao') descricao: string,
    @Body('data_hora') data_hora: Date,
    @Body('id_usuario') id_usuario: number,
  ): Promise<Operacao> {
    try {
      return await this.operacaoService.update(id, descricao, data_hora, id_usuario);
    } catch (error) {
      throw new Error(`Erro ao atualizar operação: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.operacaoService.remove(id);
    } catch (error) {
      throw new Error(`Erro ao deletar operação: ${error.message}`);
    }
  }
}
