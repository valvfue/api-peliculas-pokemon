import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { Pelicula } from './entities/pelicula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula])], // 🔹 REGISTRAR LA ENTIDAD
  controllers: [PeliculasController],
  providers: [PeliculasService],
  exports: [TypeOrmModule], // 🔹 EXPORTAR TypeOrmModule si lo necesitas en otros módulos
})
export class PeliculasModule {}
