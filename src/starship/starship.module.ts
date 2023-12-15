import { Module } from '@nestjs/common'
import { StarshipResolver } from './starship.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [StarshipResolver],
})
export class StarshipModule {}
