import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { Pelicula } from './entities/pelicula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula])], // Registra la entidad Pelicula para que TypeORM la maneje en este módulo
  controllers: [PeliculasController], // Define el controlador que manejará las rutas de películas
  providers: [PeliculasService], // Registra el servicio para manejar la lógica de negocio de películas
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que otros módulos puedan usar la entidad Pelicula si fuera necesario
})
export class PeliculasModule {}
