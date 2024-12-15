import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reserva } from '../reserva/reserva.model';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectModel(Reserva)
    private readonly reservaModel: typeof Reserva,
  ) {}

  // CRUD

  async create(data: any) {
    return this.reservaModel.create(data);
  }

  async findAll() {
    return this.reservaModel.findAll();
  }

  async findOne(id: number) {
    return this.reservaModel.findByPk(id);
  }

  async update(id: number, data: any) {
    const reserva = await this.findOne(id);
    if (!reserva) {
      throw new Error(`Reserva com ID ${id} não encontrada`);
    }
    await reserva.update(data);
    return reserva;
  }

  async delete(id: number) {
    const reserva = await this.findOne(id);
    if (!reserva) {
      throw new Error(`Reserva com ID ${id} não encontrada`);
    }
    await reserva.destroy();
  }

  // Métodos Específicos

  async reservarVaga(data: any) {
    return this.reservaModel.create(data);
  }

  async cancelarReserva(id_reserva: number) {
    const reserva = await this.findOne(id_reserva);
    if (!reserva) {
      throw new Error(`Reserva com ID ${id_reserva} não encontrada`);
    }
    await reserva.destroy();
  }

  async findReserva(id_reserva: number) {
    return this.reservaModel.findByPk(id_reserva);
  }
}
