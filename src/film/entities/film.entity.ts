import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Base } from '../../lib'
import { Person } from 'src/people/entities/person.entity'
import { Planet } from 'src/planet/entities/planet.entity'
import { Starship } from 'src/starship/entities/starship.entity'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { Species } from 'src/species/entities/species.entity'

@ObjectType()
export class Film extends Base {
  @Field()
  title: string

  @Field(() => Int)
  episode_id: number

  @Field()
  opening_crawl: string

  @Field()
  director: string

  @Field()
  producer: string

  @Field()
  release_date: string

  @Field(() => [Person])
  characters: string[]

  @Field(() => [Planet])
  planets: string[]

  @Field(() => [Starship])
  starships: string[]

  @Field(() => [Vehicle])
  vehicles: string[]

  @Field(() => [Species])
  species: string[]

  @Field()
  created: string

  @Field()
  edited: string
}
