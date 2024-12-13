import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { Vaga } from '../vaga/vaga.model';
import { PlanoTarifacao } from '../plano-tarifacao/planotarifacao.model';

@Table
export class Reserva extends Model<Reserva> {

  @Column({
    type: DataType.DATE, 
    allowNull: false, 
    defaultValue: DataType.NOW,  // Define a data como sendo a data e hora atual
  })
  data_reserva: Date;

  @Column({
    type: DataType.DATE,  // Para garantir que o campo de término da reserva é tratado corretamente
    allowNull: true,      // Torna o campo de término opcional
  })
  data_fim: Date;

  @Column({
    type: DataType.DECIMAL(10, 2), 
    allowNull: false, 
  })
  valor: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @ForeignKey(() => Vaga)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_vaga: number;

  @ForeignKey(() => PlanoTarifacao)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_plano: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @BelongsTo(() => Vaga)
  vaga: Vaga;

  @BelongsTo(() => PlanoTarifacao)
  plano: PlanoTarifacao;
}

