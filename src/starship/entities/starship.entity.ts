import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Film } from 'src/film/entities/film.entity'
import { Person } from 'src/people/entities/person.entity'

@ObjectType()
export class Starship extends Base {
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

  @Field(() => String)
  crew: string

  @Field(() => String)
  passengers: string

  @Field(() => String)
  cargo_capacity: string

  @Field(() => String)
  consumables: string

  @Field(() => String)
  hyperdrive_rating: string

  @Field(() => String)
  MGLT: string

  @Field(() => String)
  starship_class: string

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
