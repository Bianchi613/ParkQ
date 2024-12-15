import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ReservaService } from './reserva.service';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async createReserva(@Body() data: any) {
    try {
      return await this.reservaService.createReserva(data);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAllReservas() {
    try {
      return await this.reservaService.findAllReservas();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findReservaById(@Param('id') id: number) {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new HttpException('O ID da reserva deve ser um número inteiro positivo.', HttpStatus.BAD_REQUEST);
      }
      return await this.reservaService.findReservaById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateReserva(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.reservaService.updateReserva(id, data);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteReserva(@Param('id') id: number) {
    try {
      await this.reservaService.deleteReserva(id);
      return { message: 'Reserva deletada com sucesso.' };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}
