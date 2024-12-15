import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reserva } from './reserva.model';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { ReservaRepository } from './reserva.repository';

@Module({
  imports: [SequelizeModule.forFeature([Reserva])],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaRepository],
  exports: [ReservaService],
})
export class ReservaModule {}

