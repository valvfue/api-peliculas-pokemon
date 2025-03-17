import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private peliculaRepository: Repository<Pelicula>, // Inyecta el repositorio de películas para interactuar con la base de datos
  ) {}

  async create(dto: CreatePeliculaDto): Promise<Pelicula> {
    const pelicula = this.peliculaRepository.create(dto); // Crea una nueva película con los datos recibidos
    return this.peliculaRepository.save(pelicula); // Guarda la película en la base de datos
  }

  async findAll(title?: string, maxYear?: number): Promise<Pelicula[]> {
    const query = this.peliculaRepository.createQueryBuilder('pelicula'); // consulta para buscar películas
  
    if (title) {
      query.andWhere('pelicula.title LIKE :title', { title: `%${title}%` }); // Filtra por título
    }
  
    if (maxYear) {
      query.andWhere('pelicula.year < :maxYear', { maxYear }); // Filtra por año máximo
    }
  
    return query.getMany(); // Devuelve la lista de películas que cumplen con los filtros
  }  

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findOne({ where: { id } }); // Busca una película por su ID
    if (!pelicula) throw new NotFoundException(`Película con ID ${id} no encontrada`); // Lanza un error si no existe
    return pelicula; // Devuelve la película encontrada
  }

  async update(id: number, dto: CreatePeliculaDto): Promise<Pelicula> {
    await this.findOne(id); // Verifica si la película existe antes de actualizar
    await this.peliculaRepository.update(id, dto); // Actualiza la película en la base de datos
    return this.findOne(id); // Devuelve la película actualizada
  }

  async remove(id: number): Promise<void> {
    const pelicula = await this.findOne(id); // Verifica si la película existe antes de eliminar
    await this.peliculaRepository.remove(pelicula); // Elimina la película de la base de datos
  }
}


