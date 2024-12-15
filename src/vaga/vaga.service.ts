import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vaga } from './vaga.model';

@Injectable()
export class VagaService {
  constructor(
    @InjectModel(Vaga)
    private vagaModel: typeof Vaga,
  ) {}

  async findAll(): Promise<Vaga[]> {
    return this.vagaModel.findAll();
  }

  async findOne(id: number): Promise<Vaga> {
    const vaga = await this.vagaModel.findByPk(id);
    if (!vaga) {
      throw new NotFoundException(`Vaga com id ${id} não encontrada`);
    }
    return vaga;
  }

  async create(vagaData: Partial<Vaga>): Promise<Vaga> {
    return this.vagaModel.create(vagaData);
  }

  async update(id: number, vagaData: Partial<Vaga>): Promise<Vaga> {
    const vaga = await this.findOne(id);
    await vaga.update(vagaData);
    return vaga;
  }

  async remove(id: number): Promise<void> {
    const vaga = await this.findOne(id);
    await vaga.destroy();
  }

  async reservar(id: number): Promise<Vaga> {
    const vaga = await this.findOne(id);
    if (vaga.reservada) {
      throw new Error(`A vaga ${id} já está reservada`);
    }
    await vaga.update({ reservada: true, status: 'ocupada' });
    return vaga;
  }

  async liberar(id: number): Promise<Vaga> {
    const vaga = await this.findOne(id);
    if (!vaga.reservada) {
      throw new Error(`A vaga ${id} não está reservada`);
    }
    await vaga.update({ reservada: false, status: 'disponivel' });
    return vaga;
  }
}
