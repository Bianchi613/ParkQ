import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vaga } from './vaga.model';

@Injectable()
export class VagaRepository {
  constructor(
    @InjectModel(Vaga)
    private readonly vagaModel: typeof Vaga,
  ) {}

  // Encontrar Todas as Vagas
  async findAll(): Promise<Vaga[]> {
    return this.vagaModel.findAll();
  }

  // Encontrar uma Vaga por ID
  async findById(id: number): Promise<Vaga> {
    const vaga = await this.vagaModel.findByPk(id);
    if (!vaga) {
      throw new NotFoundException(`Vaga com id ${id} não encontrada`);
    }
    return vaga;
  }

  // Criar Nova Vaga
  async create(vagaData: Partial<Vaga>): Promise<Vaga> {
    return this.vagaModel.create(vagaData);
  }

  // Atualizar Vaga
  async update(id: number, vagaData: Partial<Vaga>): Promise<Vaga> {
    const vaga = await this.findById(id);
    await vaga.update(vagaData);
    return vaga;
  }

  // Remover Vaga
  async remove(id: number): Promise<void> {
    const vaga = await this.findById(id);
    await vaga.destroy();
  }

  // Reservar uma Vaga
  async reservar(id: number): Promise<Vaga> {
    const vaga = await this.findById(id);
    if (vaga.reservada) {
      throw new Error(`A vaga ${id} já está reservada`);
    }
    await vaga.update({ reservada: true, status: 'ocupada' });
    return vaga;
  }

  // Liberar uma Vaga (REGRA DE NEGÓCIO: Só se a vaga estiver ocupada)
  async liberar(id: number): Promise<Vaga> {
    const vaga = await this.findById(id);
    if (vaga.status !== 'ocupada') {
      throw new Error(`A vaga com ID ${id} não pode ser liberada porque não está ocupada`);
    }
    await vaga.update({ reservada: false, status: 'disponivel' });
    return vaga;
  }

  // Atualizar Status de Vaga
  async updateStatus(id: number, status: string): Promise<void> {
    const vaga = await this.findById(id);
    await vaga.update({ status });
  }

  // Buscar Vaga por ID
  async findOne(id: number): Promise<Vaga> {
    return this.findById(id);
  }
}
