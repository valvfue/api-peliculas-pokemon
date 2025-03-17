import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  create(@Body() dto: CreatePeliculaDto) {
    return this.peliculasService.create(dto);
  }

  @Get()
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peliculasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePeliculaDto) {
    return this.peliculasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peliculasService.remove(+id);
  }
}

