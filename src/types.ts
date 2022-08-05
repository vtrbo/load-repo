export interface IOptions {
  clone?: boolean
  depth?: string
}

export interface IRepo {
  url: string
  type: string
  origin: string
  owner: string
  name: string
  branch: string
}
