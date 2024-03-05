import { Section, UniqueData } from '../propsModels'
import { isNilOrEmpty } from './isType'

export interface SearchOptionsInterface<T extends UniqueData> {
  caseInsensitive?: boolean
  minCharactersCount?: number
  searchBy: 'title' | keyof T
  searchTerm: string
}

const defaultSearchOptions = {
  searchBy: 'title',
  caseInsensitive: false,
  minCharactersCount: 3,
  searchTerm: ''
}

const searchList = <T extends UniqueData>(
  list: Section<T>[],
  options: SearchOptionsInterface<T>
): Section<T>[] => {
  if (isNilOrEmpty(options)) {
    options = defaultSearchOptions as SearchOptionsInterface<T>
  }

  if (list.length > 0) {
    const { searchTerm, searchBy = 'title', minCharactersCount = 3 } = options

    if (searchTerm && searchBy && searchTerm.length >= minCharactersCount) {
      const { caseInsensitive } = options
      const newSection: Section<T>[] = []

      for (const innerData of list) {
        for (const item of innerData.data) {
          // @ts-ignore
          const data = (item as T)[searchBy as string].toString()
          const newTerm = caseInsensitive
            ? (searchTerm as string).toLowerCase()
            : (searchTerm as string)

          const isInclude = data.search(newTerm.trim() as string) >= 0
          if (isInclude) {
            //check it includes  the parent object
            const parentIndex = newSection.findIndex(
              (el) => el.title === innerData.title
            )
            if (parentIndex != -1) {
              newSection[parentIndex].data.push(item)
            } else {
              const parent: Section<T> = {
                title: innerData.title,
                data: [item]
              }
              newSection.push(parent)
            }
          }
        }
      }
      return newSection
      // return filterList(list, filterByFn)
    }
  }

  return list
}

export default searchList
