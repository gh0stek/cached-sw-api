import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Film } from 'src/film/entities/film.entity'
import { Planet } from 'src/planet/entities/planet.entity'
import { Species } from 'src/species/entities/species.entity'
import { Starship } from 'src/starship/entities/starship.entity'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'

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

  @Field(() => Planet)
  homeworld: string

  @Field(() => [Film])
  films: string[]

  @Field(() => [Species])
  species: string[]

  @Field(() => [Vehicle])
  vehicles: string[]

  @Field(() => [Starship])
  starships: string[]

  @Field(() => String)
  created: string

  @Field(() => String)
  edited: string

  @Field(() => String)
  url: string
}
