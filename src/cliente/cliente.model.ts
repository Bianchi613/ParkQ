import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table
export class Cliente extends Model<Cliente> {

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data_registro: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  preferencias: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
