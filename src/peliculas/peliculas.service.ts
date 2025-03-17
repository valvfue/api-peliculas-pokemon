import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private peliculaRepository: Repository<Pelicula>,
  ) {}

  async create(dto: CreatePeliculaDto): Promise<Pelicula> {
    const pelicula = this.peliculaRepository.create(dto);
    return this.peliculaRepository.save(pelicula);
  }

  async findAll(title?: string, maxYear?: number): Promise<Pelicula[]> {
    const query = this.peliculaRepository.createQueryBuilder('pelicula');
  
    if (title) {
      query.andWhere('pelicula.title LIKE :title', { title: `%${title}%` });
    }
  
    if (maxYear) {
      query.andWhere('pelicula.year < :maxYear', { maxYear });
    }
  
    return query.getMany();
  }  

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findOne({ where: { id } });
    if (!pelicula) throw new NotFoundException(`Película con ID ${id} no encontrada`);
    return pelicula;
  }

  async update(id: number, dto: CreatePeliculaDto): Promise<Pelicula> {
    await this.findOne(id);
    await this.peliculaRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const pelicula = await this.findOne(id);
    await this.peliculaRepository.remove(pelicula);
  }
}


