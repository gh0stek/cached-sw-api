import { Module } from '@nestjs/common'
import { PeopleResolver } from './people.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [PeopleResolver],
})
export class PeopleModule {}
