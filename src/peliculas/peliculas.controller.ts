import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { Query } from '@nestjs/common';

@Controller('peliculas') // Define la ruta base '/peliculas'
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {} // Inyecta el servicio de películas

  @Post()
  create(@Body() dto: CreatePeliculaDto) { // Recibe los datos de la película en el cuerpo de la petición
    return this.peliculasService.create(dto); // Llama al servicio para crear la película
  }

  @Get()
  findAll(@Query('title') title?: string, @Query('maxYear') maxYear?: number) {
    return this.peliculasService.findAll(title, maxYear); // Llama al servicio para obtener las películas con filtros
  }

  @Get(':id')
  findOne(@Param('id') id: string) { // Obtiene el ID desde la URL
    return this.peliculasService.findOne(+id); // Llama al servicio para buscar una película por ID
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePeliculaDto) { // Recibe el ID y los nuevos datos
    return this.peliculasService.update(+id, dto); // Llama al servicio para actualizar la película
  }

  @Delete(':id')
  remove(@Param('id') id: string) { // Obtiene el ID de la película a eliminar
    return this.peliculasService.remove(+id); // Llama al servicio para eliminar la película
  }
}

