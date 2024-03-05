import { Section, UniqueData } from '../propsModels'
import { isFunction, isString } from './isType'

const filterList = <T extends UniqueData>(
  list: Section<T>[],
  by: 'title' | keyof T | ((item: Section<T>, idx: number) => boolean),
  filterValue: string
): Section<T>[] =>
  list.filter((item: Section<T>, idx: number) => {
    if (by === 'title') {
      return item.title === filterValue
    } else if (isString(by)) {
      // @ts-ignore
      const data = item.data.filter((el: any) => el[by] === filterValue)
      return data.length > 0
    }

    if (isFunction(by)) {
      return (by as (item: Section<T>, idx: number) => boolean)(
        item as Section<T>,
        idx
      )
    }

    return true
  })

export default filterList
