import { Module } from '@nestjs/common'
import { PlanetResolver } from './planet.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [PlanetResolver],
})
export class PlanetModule {}
