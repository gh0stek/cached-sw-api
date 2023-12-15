import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Planet } from 'src/planet/entities/planet.entity'
import { Person } from 'src/people/entities/person.entity'
import { Film } from 'src/film/entities/film.entity'

@ObjectType()
export class Species extends Base {
  @Field(() => String)
  name: string

  @Field(() => String)
  classification: string

  @Field(() => String)
  designation: string

  @Field(() => Int)
  average_height: number

  @Field(() => String)
  skin_colors: string

  @Field(() => String)
  hair_colors: string

  @Field(() => String)
  eye_colors: string

  @Field(() => String)
  average_lifespan: string

  @Field(() => Planet)
  homeworld: string

  @Field(() => String)
  language: string

  @Field(() => String)
  created: string

  @Field(() => String)
  edited: string

  @Field(() => [Person])
  people: string[]

  @Field(() => [Film])
  films: string[]

  @Field(() => String)
  url: string
}
