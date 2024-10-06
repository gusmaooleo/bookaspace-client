export interface GenericSubpage {
  title: string | any,
  description: string | any,
  link?: string | any,
  username?: string | any,
  type?: 'common' | 'link' | 'user' | 'title',
}