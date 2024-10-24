export interface CharactersMetaData {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: Data
}

export interface Data {
  offset: number
  limit: number
  total: number
  count: number
  results: Characters[]
}

export interface Characters {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
  favorite?: boolean
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface Comics {
  available: number
  collectionURI: string
  items: Comic[]
  returned: number
}

export interface Comic {
  resourceURI: string
  name: string
}

export interface Series {
  available: number
  collectionURI: string
  items: Serie[]
  returned: number
}

export interface Serie {
  resourceURI: string
  name: string
}

export interface Stories {
  available: number
  collectionURI: string
  items: Storie[]
  returned: number
}

export interface Storie {
  resourceURI: string
  name: string
  type: string
}

export interface Events {
  available: number
  collectionURI: string
  items: Event[]
  returned: number
}

export interface Event {
  resourceURI: string
  name: string
}

export interface Url {
  type: string
  url: string
}
