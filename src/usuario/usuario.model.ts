import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Estacionamento } from '../estacionamento/estacionamento.model';
import { Operacao } from '../operacao/operacao.model';
import { Reserva } from '../reserva/reserva.model';

@Table
export class Usuario extends Model<Usuario> {

  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
  })
  CPF: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  telefone: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [['cliente', 'administrador', 'visitante']],  // Validação para tipos específicos de usuário
    },
  })
  tipo_usuario: string;

  @ForeignKey(() => Estacionamento)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_estacionamento: number;

  @BelongsTo(() => Estacionamento)
  estacionamento: Estacionamento;

  // Relacionamento de um usuário para várias reservas
  @HasMany(() => Reserva)
  reservas: Reserva[];

  // Relacionamento de um usuário para várias operações
  @HasMany(() => Operacao)
  operacoes: Operacao[];
}
