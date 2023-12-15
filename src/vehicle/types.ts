import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Vehicle } from './entities/vehicle.entity'

export class VehicleResource extends Vehicle implements SWApiResourceResponse {
  apiResource: 'vehicles'
}

@ObjectType()
export class PaginatedVehicles extends Paginated(Vehicle) {}
