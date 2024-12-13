import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { EstacionamentoModule } from './estacionamento/estacionamento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PlanoTarifacaoModule } from './plano-tarifacao/plano-tarifacao.module';
import { VagaModule } from './vaga/vaga.module';
import { ReservaModule } from './reserva/reserva.module';
import { OperacaoModule } from './operacao/operacao.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { ClienteModule } from './cliente/cliente.module';
import { AdministradorModule } from './administrador/administrador.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [], // Adicione suas entidades aqui caso não use autoLoadModels
      autoLoadModels: true, // Ativa o carregamento automático das entidades registradas
      synchronize: true, // Cria e/ou atualiza as tabelas no banco
    }),
    EstacionamentoModule,
    UsuarioModule,
    PlanoTarifacaoModule,
    VagaModule,
    ReservaModule,
    OperacaoModule,
    PagamentoModule,
    ClienteModule,
    AdministradorModule,
    // Adicione aqui mais módulos conforme necessário
  ],
})
export class AppModule {}
