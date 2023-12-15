import { Field, ArgsType, Int } from '@nestjs/graphql'

@ArgsType()
export class PageArgs {
  @Field(() => Int, { nullable: true })
  page?: number

  @Field({ nullable: true })
  search?: string
}
