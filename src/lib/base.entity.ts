import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class Base {
  @Field(() => Int)
  id: number
}
