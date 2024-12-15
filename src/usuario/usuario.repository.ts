import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  async create(data: any) { /* lógica do create */ }
  async findAll() { /* lógica do findAll */ }
  async findOne(id: number) { /* lógica do findOne */ }
  async update(id: number, data: any) { /* lógica do update */ }
  async delete(id: number) { /* lógica do delete */ }
}
