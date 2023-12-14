import { Module } from '@nestjs/common'
import { FilmService } from './film.service'
import { FilmResolver } from './film.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [FilmResolver, FilmService],
})
export class FilmModule {}
