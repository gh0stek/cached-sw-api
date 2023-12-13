import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Film {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field(() => Int)
  episodeId: number

  @Field()
  openingCrawl: string

  @Field()
  director: string

  @Field()
  producer: string

  @Field()
  releaseDate: string

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
