import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) // 🔹 Inyectar correctamente el repositorio
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(dto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(dto);
    return this.pokemonRepository.save(pokemon);
  }

  async findAll(name?: string, type?: string, minHp?: number): Promise<Pokemon[]> {
    const query = this.pokemonRepository.createQueryBuilder('pokemon');
  
    if (name) {
      query.andWhere('pokemon.name LIKE :name', { name: `%${name}%` });
    }
  
    if (type) {
      query.andWhere('pokemon.type = :type', { type });
    }
  
    if (minHp) {
      query.andWhere('pokemon.hp > :minHp', { minHp });
    }
  
    return query.getMany();
  }
  

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    if (!pokemon) throw new NotFoundException(`Pokémon con ID ${id} no encontrado`);
    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.findOne(id);
    Object.assign(pokemon, updatePokemonDto);
    return this.pokemonRepository.save(pokemon);
  }

  async remove(id: number): Promise<void> {
    const pokemon = await this.findOne(id);
    await this.pokemonRepository.remove(pokemon);
  }
}



