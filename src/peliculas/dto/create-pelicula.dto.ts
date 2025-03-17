import { IsInt, IsString, Min } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  title: string;

  @IsString()
  director: string;

  @IsInt()
  @Min(1800)
  year: number;

  @IsInt()
  length_minutes: number;
}

