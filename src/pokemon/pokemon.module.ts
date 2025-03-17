import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon } from './entities/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])], // 🔹 REGISTRAR LA ENTIDAD
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [TypeOrmModule], // 🔹 EXPORTAR TypeOrmModule si es necesario en otros módulos
})
export class PokemonModule {}
