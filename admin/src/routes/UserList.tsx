import { AdminBoard } from '../components/AdminBoard'
import { getUserList, User } from '../apis/api'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { BoardPagination } from '../components/BoardPagination'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const UserList = () => {
  const [UserList, setUserList] = useState<User[]>([])

  const [curPage, setCurPage] = useState(1)
  const [limitPage] = useState(12)

  const [dataLoading, setdataLoading] = useState(false)

  //페이지 계산
  const offset = (curPage - 1) * limitPage
  const lastPage = curPage * limitPage
  const firstPage = lastPage - limitPage
  const currentPages = (page: User[]) => {
    let result = []
    result = page.slice(firstPage, lastPage)
    return result
  }

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getUserList()
        setUserList(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching users:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  return (
    <AdminBoard title="사용자 목록">
      {!dataLoading ? <Total>({UserList.length})</Total> : ''}
      <BoardHeader>
        <span className="board-header index">No</span>
        <span className="board-header email">이메일</span>
        <span className="board-header name">이름</span>
      </BoardHeader>
      <BoardContent>
        {!dataLoading ? (
          UserList.length > 0 ? (
            currentPages(UserList).map((user, index) => (
              <BoardItem key={index}>
                <span className="board-header index">{index + offset + 1}</span>
                <span className="board-header email">{user.email}</span>
                <span className="board-header name">{user.displayName}</span>
              </BoardItem>
            ))
          ) : (
            <EmptyList>가입된 사용자가 없습니다.</EmptyList>
          )
        ) : (
          ''
        )}
      </BoardContent>
      <BottomWrap>
        <BoardPagination
          limitPage={limitPage}
          total={UserList.length}
          paginate={setCurPage}
          curpage={curPage}
        />
      </BottomWrap>
      {dataLoading && <LoadingSpinner />}
    </AdminBoard>
  )
}

const Total = styled.span`
  position: absolute;
  top: 15px;
  left: 125px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
`

const BoardHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  .board-header {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
  .name {
    flex-grow: 3;
  }
  .email {
    flex-grow: 4;
  }
`
const BoardContent = styled.div`
  width: 100%;
  max-height: 360px;
  overflow: hidden;
`
const BoardItem = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .board-header {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
  .name {
    flex-grow: 3;
  }
  .email {
    flex-grow: 4;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.gray_1};
  }
`

const EmptyList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`
const BottomWrap = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
