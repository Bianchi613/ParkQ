import { Injectable } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';
import { VagaRepository } from '../vaga/vaga.repository'; // Repositório de Vagas

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly vagaRepository: VagaRepository, // Repositório de Vagas para verificar o status
  ) {}

  // CRUD

  async create(data: any) {
    return this.clienteRepository.create(data);
  }

  async findAll() {
    return this.clienteRepository.findAll();
  }

  async findOne(id: number) {
    return this.clienteRepository.findOne(id);
  }

  async update(id: number, data: any) {
    return this.clienteRepository.update(id, data);
  }

  async delete(id: number) {
    return this.clienteRepository.delete(id);
  }

  //  **Método para Reservar Vaga**
  async reservarVaga(id: number, data: any) {
    // Verifica se o cliente existe
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    // Verifica se a vaga está disponível
    const vaga = await this.vagaRepository.findOne(data.id);
    if (!vaga) {
      throw new Error(`Vaga com ID ${data.id} não encontrada`);
    }

    if (vaga.status !== 'disponivel') {
      throw new Error(`A vaga com ID ${data.id} não está disponível para reserva`);
    }

    // Se a vaga estiver disponível, cria a reserva
    const reserva = {
      id_cliente: id,
      id_vaga: data.id, // Aqui o campo correto agora é 'id'
      data_reserva: new Date(),
      status: 'reservada',
    };

    // Atualiza o status da vaga para "reservada"
    await this.vagaRepository.updateStatus(data.id, 'ocupada');

    // Salva a reserva no banco
    return this.clienteRepository.reservarVaga(reserva);
  }

  //  **Método para Cancelar Reserva**
  async cancelarReserva(id: number, data: any) {
    // Verifica se o cliente existe
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    // Verifica se a reserva existe
    const reserva = await this.clienteRepository.findReserva(data.id_reserva);
    if (!reserva) {
      throw new Error(`Reserva com ID ${data.id_reserva} não encontrada`);
    }

    // Remoção/cancelamento da reserva no banco
    await this.clienteRepository.cancelarReserva(data.id_reserva);

    // Atualiza o status da vaga para "disponivel"
    await this.vagaRepository.updateStatus(reserva.id_vaga, 'disponivel'); 

    return `Reserva de ID ${data.id_reserva} foi cancelada com sucesso.`;
  }
}
