import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Person } from 'src/people/entities/person.entity'
import { Film } from 'src/film/entities/film.entity'

@ObjectType()
export class Vehicle extends Base {
  @Field(() => String)
  name: string

  @Field(() => String)
  model: string

  @Field(() => String)
  manufacturer: string

  @Field(() => String)
  cost_in_credits: string

  @Field(() => String)
  length: string

  @Field(() => String)
  max_atmosphering_speed: string

  @Field(() => Int)
  crew: number

  @Field(() => Int)
  passengers: number

  @Field(() => String)
  cargo_capacity: string

  @Field(() => String)
  consumables: string

  @Field(() => String)
  vehicle_class: string

  @Field(() => [Person])
  pilots: string[]

  @Field(() => [Film])
  films: string[]

  @Field(() => String)
  created: string

  @Field(() => String)
  edited: string

  @Field(() => String)
  url: string
}
