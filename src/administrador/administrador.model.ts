import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table
export class Administrador extends Model<Administrador> {

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @Column({
    type: DataType.STRING(100),  // Ajuste para refletir o tipo do campo "cargo"
    allowNull: true,
  })
  cargo: string;

  @Column({
    type: DataType.TEXT,  // O tipo TEXT já é adequado para o campo "privilegios"
    allowNull: true,
  })
  privilegios: string;

  // Relacionamento com Usuario (chave estrangeira)
  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
