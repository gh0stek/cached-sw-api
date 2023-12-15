import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Person } from 'src/people/entities/person.entity'
import { Film } from 'src/film/entities/film.entity'

@ObjectType()
export class Planet extends Base {
  @Field(() => String)
  name: string

  @Field(() => String)
  rotation_period: string

  @Field(() => String)
  orbital_period: string

  @Field(() => String)
  diameter: string

  @Field(() => String)
  climate: string

  @Field(() => String)
  gravity: string

  @Field(() => String)
  terrain: string

  @Field(() => String)
  surface_water: string

  @Field(() => String)
  population: string

  @Field(() => [Person])
  residents: string[]

  @Field(() => [Film])
  films: string[]

  @Field(() => Date)
  created: Date

  @Field(() => Date)
  edited: Date

  @Field(() => String)
  url: string
}
