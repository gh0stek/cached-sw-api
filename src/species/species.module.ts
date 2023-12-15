import { Module } from '@nestjs/common'
import { SpeciesResolver } from './species.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [SpeciesResolver],
})
export class SpeciesModule {}
