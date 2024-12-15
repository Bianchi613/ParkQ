import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
  import { VagaService } from './vaga.service';
  import { Vaga } from './vaga.model';
  
  @Controller('vagas')
  export class VagaController {
    constructor(private readonly vagaService: VagaService) {}
  
    @Get()
    async findAll(): Promise<Vaga[]> {
      return this.vagaService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Vaga> {
      return this.vagaService.findOne(id);
    }
  
    @Post()
    async create(@Body() vagaData: Partial<Vaga>): Promise<Vaga> {
      return this.vagaService.create(vagaData);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() vagaData: Partial<Vaga>,
    ): Promise<Vaga> {
      return this.vagaService.update(id, vagaData);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return this.vagaService.remove(id);
    }
  
    @Post(':id/reservar')
    async reservar(@Param('id') id: number): Promise<Vaga> {
      return this.vagaService.reservar(id);
    }
  
    @Post(':id/liberar')
    async liberar(@Param('id') id: number): Promise<Vaga> {
      return this.vagaService.liberar(id);
    }
  }
  