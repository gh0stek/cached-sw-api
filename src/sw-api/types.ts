import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Type } from '@nestjs/common'

export type SWApiResource =
  | 'people'
  | 'planets'
  | 'films'
  | 'species'
  | 'vehicles'
  | 'starships'
  | 'unknown'

export interface SWApiResourceResponse {
  apiResource: SWApiResource
}

export type SWApiResponse<T extends SWApiResourceResponse> = Omit<
  T,
  'apiResource'
>

export interface IPaginatedType<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    results: T[]

    @Field(() => Int)
    count: number

    @Field({ nullable: true })
    next?: string

    @Field({ nullable: true })
    previous?: string
  }
  return PaginatedType as Type<IPaginatedType<T>>
}
