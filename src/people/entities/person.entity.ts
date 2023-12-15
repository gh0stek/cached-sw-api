import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Film } from 'src/film/entities/film.entity'
@ObjectType()
export class Person extends Base {
  @Field(() => String)
  name: string

  @Field(() => String)
  height: string

  @Field(() => String)
  mass: string

  @Field(() => String)
  hair_color: string

  @Field(() => String)
  skin_color: string

  @Field(() => String)
  eye_color: string

  @Field(() => String)
  birth_year: string

  @Field(() => String)
  gender: string

  @Field(() => String)
  homeworld: string

  @Field(() => [Film])
  films: string[]

  @Field(() => [String])
  species: string[]

  @Field(() => [String])
  vehicles: string[]

  @Field(() => [String])
  starships: string[]

  @Field(() => String)
  created: string

  @Field(() => String)
  edited: string

  @Field(() => String)
  url: string
}