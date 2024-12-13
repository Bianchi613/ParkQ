import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { Vaga } from '../vaga/vaga.model';

@Table
export class Estacionamento extends Model<Estacionamento> {

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING(255), // Ajuste para comprimento maior
    allowNull: false,
  })
  localizacao: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacidade: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vagas_disponiveis: number;

  @HasMany(() => Usuario)
  usuarios: Usuario[];

  @HasMany(() => Vaga)
  vagas: Vaga[];
}
