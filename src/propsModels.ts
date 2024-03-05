import { HTMLAttributes, ReactNode } from 'react'
import { SearchOptionsInterface } from './utils/searchList'

export interface UniqueData {
  id: string | number
}

export interface Section<T extends UniqueData> {
  title: string
  data: T[]
}

export type ParentProps<T extends UniqueData> = HTMLAttributes<HTMLDivElement> &
  IUseSectionListProps<T>

export interface SectionListProps<T extends UniqueData> extends ParentProps<T> {
  sections: Section<T>[]
  renderItem: (item: T) => ReactNode
  renderSectionHeader?: (section: Section<T>) => ReactNode
}

export type Data<T extends UniqueData> = IProps<T> & SearchOptionsInterface<T>

export interface IUseSectionListProps<T extends UniqueData> extends Data<T> {
  list: Section<T>[]
}

export interface IProps<T extends UniqueData> {
  reversed: boolean
  limit: boolean
  filterBy: 'title' | keyof T | ((item: Section<T>, idx: number) => boolean)
  filterValue: string

  //   search
  //   searchBy
  //   searchOnEveryWord
  //   searchTerm
  //   searchCaseInsensitive
}
