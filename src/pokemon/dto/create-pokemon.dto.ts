import { IsInt, IsString, Min, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  @Min(1)
  hp: number;

  @IsInt()
  @Min(1)
  attack: number;
}


