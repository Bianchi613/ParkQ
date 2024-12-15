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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configuração de variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Disponibiliza as variáveis de ambiente para toda a aplicação
      envFilePath: '.env', // Caminho do arquivo .env
    }),
    
    // Configuração do Sequelize (Banco de Dados)
    SequelizeModule.forRoot({
      dialect: 'postgres', // Banco de dados PostgreSQL
      host: process.env.DATABASE_HOST, // Variável de ambiente para o host
      port: parseInt(process.env.DATABASE_PORT), // Porta do banco de dados
      username: process.env.DATABASE_USER, // Usuário do banco
      password: process.env.DATABASE_PASSWORD, // Senha do banco
      database: process.env.DATABASE_NAME, // Nome do banco de dados
      autoLoadModels: true, // Carregamento automático das entidades
      synchronize: process.env.NODE_ENV !== 'production', // Em produção, não sincroniza as tabelas
      logging: process.env.NODE_ENV !== 'production', // Desabilita logs de SQL no modo produção
    }),

    // Importação dos módulos principais
    EstacionamentoModule,
    UsuarioModule,
    PlanoTarifacaoModule,
    VagaModule,
    ReservaModule,
    OperacaoModule,
    PagamentoModule,
    ClienteModule,
    AdministradorModule,
    AuthModule, // Importação do módulo de autenticação
  ],
})
export class AppModule {}
