import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Query } from '@nestjs/common';
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() dto: CreatePokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Get()
findAll(@Query('name') name?: string, @Query('type') type?: string, @Query('minHp') minHp?: number) {
  return this.pokemonService.findAll(name, type, minHp);
 }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Put(':id')
update(@Param('id') id: string, @Body() dto: UpdatePokemonDto) {
  return this.pokemonService.update(+id, dto);
 }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}

