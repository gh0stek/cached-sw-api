import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Base } from '../../lib'

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

  @Field(() => [String])
  characters: string[]

  @Field(() => [String])
  planets: string[]

  @Field(() => [String])
  starships: string[]

  @Field(() => [String])
  vehicles: string[]

  @Field(() => [String])
  species: string[]

  @Field()
  created: string

  @Field()
  edited: string
}
