import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { Pagamento } from './pagamento.model';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  async create(@Body() data: Partial<Pagamento>): Promise<Pagamento> {
    try {
      return await this.pagamentoService.createPagamento(data);
    } catch (error) {
      throw new Error('Error creating Pagamento: ' + error.message);
    }
  }

  @Get()
  async findAll(): Promise<Pagamento[]> {
    try {
      return await this.pagamentoService.getAllPagamentos();
    } catch (error) {
      throw new Error('Error retrieving Pagamentos: ' + error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Pagamento> {
    try {
      return await this.pagamentoService.getPagamentoById(id);
    } catch (error) {
      throw new Error('Error retrieving Pagamento by ID: ' + error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Pagamento>,
  ): Promise<Pagamento> {
    try {
      return await this.pagamentoService.updatePagamento(id, data);
    } catch (error) {
      throw new Error('Error updating Pagamento: ' + error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      await this.pagamentoService.deletePagamento(id);
    } catch (error) {
      throw new Error('Error deleting Pagamento: ' + error.message);
    }
  }
}
