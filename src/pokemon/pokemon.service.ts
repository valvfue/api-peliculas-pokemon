import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) // Inyecta el repositorio de Pokémon para interactuar con la base de datos
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(dto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(dto); // Crea un nuevo Pokémon con los datos recibidos
    return this.pokemonRepository.save(pokemon); // Guarda el Pokémon en la base de datos
  }

  async findAll(name?: string, type?: string, minHp?: number): Promise<Pokemon[]> {
    const query = this.pokemonRepository.createQueryBuilder('pokemon'); // Consulta para buscar Pokémon
  
    if (name) {
      query.andWhere('pokemon.name LIKE :name', { name: `%${name}%` }); // Filtra por nombre
    }
  
    if (type) {
      query.andWhere('pokemon.type = :type', { type }); // Filtra por tipo
    }
  
    if (minHp) {
      query.andWhere('pokemon.hp > :minHp', { minHp }); // Filtra por HP mínimo
    }
  
    return query.getMany(); // Devuelve la lista de Pokémon que cumplen con los filtros
  }
  
  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } }); // Busca un Pokémon por su ID
    if (!pokemon) throw new NotFoundException(`Pokémon con ID ${id} no encontrado`); // Lanza un error si no existe
    return pokemon; // Devuelve el Pokémon encontrado
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.findOne(id); // Verifica si el Pokémon existe antes de actualizar
    Object.assign(pokemon, updatePokemonDto); // Actualiza solo los campos recibidos en el DTO
    return this.pokemonRepository.save(pokemon); // Guarda los cambios en la base de datos
  }

  async remove(id: number): Promise<void> {
    const pokemon = await this.findOne(id); // Verifica si el Pokémon existe antes de eliminar
    await this.pokemonRepository.remove(pokemon); // Elimina el Pokémon de la base de datos
  }
}



