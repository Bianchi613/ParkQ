import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VagaService } from './vaga.service';
import { VagaController } from './vaga.controller';
import { Vaga } from './vaga.model';

@Module({
  imports: [SequelizeModule.forFeature([Vaga])],
  controllers: [VagaController],
  providers: [VagaService],
  exports: [VagaService],
})
export class VagaModule {}
