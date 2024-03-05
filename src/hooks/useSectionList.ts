import { useMemo } from 'react'
import { IUseSectionListProps, UniqueData } from '../propsModels'
import filterList from '../utils/filterList'
import limitList from '../utils/limitList'
import reverseList from '../utils/reverseList'
import searchList from '../utils/searchList'


export const useSectionList = <T extends UniqueData>({
  list,
  reversed,
  limit,
  filterBy,
  filterValue,
  searchBy,
  searchTerm,
  caseInsensitive,
  minCharactersCount
}: //   search,
//   searchBy,
//   searchOnEveryWord,
//   searchTerm,
//   searchCaseInsensitive
IUseSectionListProps<T>) => {
  let sectionRenderList = list
  // reverse list
  sectionRenderList = useMemo(
    () =>
      typeof reversed === 'boolean' && reversed
        ? reverseList(sectionRenderList)
        : sectionRenderList,
    [sectionRenderList, reversed]
  )

  // limit list
  sectionRenderList = useMemo(() => {
    if (limit) {
      const [from, to] = `${limit}`.split(',')
      return limitList(sectionRenderList, from, to)
    }

    return sectionRenderList
  }, [sectionRenderList, limit])

  // filter list
  sectionRenderList = useMemo(
    () =>
      filterBy
        ? filterList(sectionRenderList, filterBy, filterValue)
        : sectionRenderList,
    [sectionRenderList, filterBy]
  )

  // search list
  sectionRenderList = useMemo(() => {
    if (searchTerm && searchBy) {
      return searchList(sectionRenderList, {
        searchBy: searchBy,
        searchTerm: searchTerm,
        caseInsensitive: caseInsensitive,
        minCharactersCount
      })
    }
    return sectionRenderList
  }, [
    sectionRenderList,
    searchBy,
    searchTerm,
    caseInsensitive,
    minCharactersCount
  ])

  return { sectionRenderList }
}
