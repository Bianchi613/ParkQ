// src/estacionamento/estacionamento.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EstacionamentoService } from './estacionamento.service';

@Controller('estacionamentos')
export class EstacionamentoController {
  constructor(private readonly estacionamentoService: EstacionamentoService) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.estacionamentoService.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.estacionamentoService.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    try {
      return await this.estacionamentoService.update(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.estacionamentoService.remove(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id/monitorar')
  async monitorarVagas(@Param('id') id: number) {
    try {
      return await this.estacionamentoService.monitorarVagas(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id/relatorio')
  async gerarRelatorios(@Param('id') id: number) {
    try {
      return await this.estacionamentoService.gerarRelatorios(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}