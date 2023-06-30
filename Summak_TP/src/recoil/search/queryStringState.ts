import { atom } from 'recoil'
import { v1 } from 'uuid'

// * 검색 쿼리 스트링을 객체로 관리하는 atom입니다.
export type SearchQuery = {
  sort?: string
  search?: string
  genre?: string
  [key: string]: string | undefined
}

export const searchQueryState = atom<SearchQuery>({
  key: 'searchQueryState' + v1(),
  default: {}
})
