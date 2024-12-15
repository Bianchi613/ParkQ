import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async create(data: any) {
    return this.usuarioRepository.create(data);
  }

  async findAll() {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: number) {
    return this.usuarioRepository.findOne(id);
  }

  async update(id: number, data: any) {
    return this.usuarioRepository.update(id, data);
  }

  async delete(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
