import { Module } from '@nestjs/common'
import { VehicleResolver } from './vehicle.resolver'
import { SWApiModule } from 'src/sw-api'

@Module({
  imports: [SWApiModule],
  providers: [VehicleResolver],
})
export class VehicleModule {}
