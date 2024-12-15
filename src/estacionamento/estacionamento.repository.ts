import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Estacionamento } from './estacionamento.model';
import { Usuario } from '../usuario/usuario.model';
import { Vaga } from '../vaga/vaga.model';

@Injectable()
export class EstacionamentoRepository {
  constructor(
    @InjectModel(Estacionamento)
    private readonly estacionamentoModel: typeof Estacionamento,
  ) {}

  async create(createEstacionamentoDto: any): Promise<Estacionamento> {
    return await this.estacionamentoModel.create(createEstacionamentoDto);
  }

  async findAll(): Promise<Estacionamento[]> {
    return this.estacionamentoModel.findAll({ include: [Usuario, Vaga] });
  }

  async findOne(id: number): Promise<Estacionamento> {
    return this.estacionamentoModel.findOne({ where: { id }, include: [Usuario, Vaga] });
  }

  async update(id: number, updateEstacionamentoDto: any): Promise<Estacionamento> {
    const estacionamento = await this.findOne(id);
    if (estacionamento) {
      return estacionamento.update(updateEstacionamentoDto);
    }
  }

  async remove(id: number): Promise<void> {
    const estacionamento = await this.findOne(id);
    if (estacionamento) {
      await estacionamento.destroy();
    }
  }
}
