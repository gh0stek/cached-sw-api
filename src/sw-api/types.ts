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

export type SWApiResponce<T> = Omit<T, 'apiResource'>
