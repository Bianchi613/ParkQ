import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  // CRUD

  @Post()
  async create(@Body() data: any) {
    try {
      return await this.clienteService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.clienteService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.clienteService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.clienteService.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.clienteService.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Métodos Específicos

  @Post(':id/reservarVaga')
  async reservarVaga(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.clienteService.reservarVaga(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Post(':id/cancelarReserva')
  async cancelarReserva(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.clienteService.cancelarReserva(id, data);
    } catch (error) {
      throw error;
    }
  }
}
