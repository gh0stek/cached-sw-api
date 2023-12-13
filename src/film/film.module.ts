import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmResolver } from './film.resolver';

@Module({
  providers: [FilmResolver, FilmService],
})
export class FilmModule {}
