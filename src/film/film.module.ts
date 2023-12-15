import { Module } from '@nestjs/common'
import { FilmResolver } from './film.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [FilmResolver],
})
export class FilmModule {}
