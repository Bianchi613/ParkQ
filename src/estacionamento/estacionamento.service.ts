import { Injectable } from '@nestjs/common';
import { EstacionamentoRepository } from './estacionamento.repository';
import { Estacionamento } from './estacionamento.model';

@Injectable()
export class EstacionamentoService {
  constructor(
    private readonly estacionamentoRepository: EstacionamentoRepository,
  ) {}

  async create(createEstacionamentoDto: any): Promise<Estacionamento> {
    return this.estacionamentoRepository.create(createEstacionamentoDto);
  }

  async findAll(): Promise<Estacionamento[]> {
    return this.estacionamentoRepository.findAll();
  }

  async findOne(id: number): Promise<Estacionamento> {
    return this.estacionamentoRepository.findOne(id);
  }

  async update(id: number, updateEstacionamentoDto: any): Promise<Estacionamento> {
    return this.estacionamentoRepository.update(id, updateEstacionamentoDto);
  }

  async remove(id: number): Promise<void> {
    return this.estacionamentoRepository.remove(id);
  }

  async monitorarVagas(id: number): Promise<void> {
    const estacionamento = await this.estacionamentoRepository.findOne(id);
    if (estacionamento) {
      const vagasOcupadas = await estacionamento.$get('vagas');
      const vagasDisponiveis = vagasOcupadas.filter(vaga => vaga.status === 'disponivel').length;
      await estacionamento.update({ vagas_disponiveis: vagasDisponiveis });
    }
  }

  async gerarRelatorios(id: number): Promise<any> {
    const estacionamento = await this.estacionamentoRepository.findOne(id);
    if (!estacionamento) return { error: 'Estacionamento não encontrado' };

    const vagas = await estacionamento.$get('vagas');
    const totalVagas = vagas.length;
    const vagasOcupadas = vagas.filter(vaga => vaga.status === 'ocupada').length;
    const faturamento = vagasOcupadas * 10; //  considerando o custo por vaga
    const tempoMedio = 120; // 
    //  cálculo (em minutos)

    return {
      ocupacao: (vagasOcupadas / totalVagas) * 100,
      faturamento,
      tempoMedio,
    };
  }
}
