import { AdminBoard } from '../components/AdminBoard'
import { getPurchaseList, TransactionDetail } from '../apis/api'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { BoardPagination } from '../components/BoardPagination'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const PurchaseManage = () => {
  const [purchaseList, setpurchaseList] = useState<TransactionDetail[]>([])

  const [dataLoading, setdataLoading] = useState(false)

  const [curPage, setCurPage] = useState(1)
  const [limitPage] = useState(12)

  //페이지 계산
  const offset = (curPage - 1) * limitPage
  const lastPage = curPage * limitPage
  const firstPage = lastPage - limitPage
  const currentPages = (page: TransactionDetail[]) => {
    let result = []
    result = page.slice(firstPage, lastPage)
    return result
  }

  const navigate = useNavigate()
  //상세로 이동
  const handleDoubleclickItem = (id: string) => {
    navigate('/purchasedetail', {
      state: {
        id,
      },
    })
  }

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getPurchaseList()
        setpurchaseList(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching products:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  return (
    <AdminBoard title="거래 내역">
      {!dataLoading ? <Total>({purchaseList.length})</Total> : ''}
      <BoardHeader>
        <span className="board-header index">No</span>
        <span className="board-header date">거래일</span>
        <span className="board-header name">거래 고객명</span>
        <span className="board-header price">거래금액</span>
        <span className="board-header bank">거래은행</span>
        <span className="board-header title">상품명</span>
        <span className="board-header cancel">취소여부</span>
        <span className="board-header done">완료여부</span>
      </BoardHeader>
      <BoardContent>
        {!dataLoading ? (
          purchaseList.length > 0 ? (
            currentPages(purchaseList).map((list, index) => (
              <BoardItem
                key={index}
                onDoubleClick={() => {
                  handleDoubleclickItem(list.detailId)
                }}
              >
                <span className="board-header index">{index + offset + 1}</span>
                <span className="board-header date">
                  {list.timePaid.split('.')[0].split('T')[0]}
                </span>
                <span className="board-header name">{list.user.displayName}</span>
                <span className="board-header price">{list.product.price}</span>
                <span className="board-header bank">{list.account.bankName}</span>
                <span className="board-header title">{list.product.title}</span>
                <span className="board-header cancel">{list.isCanceled ? 'Y' : 'N'}</span>
                <span className="board-header done">{list.done ? 'Y' : 'N'}</span>
              </BoardItem>
            ))
          ) : (
            <EmptyList>거래 내역이 없습니다.</EmptyList>
          )
        ) : (
          ''
        )}
      </BoardContent>
      <BottomWrap>
        <BoardPagination
          limitPage={limitPage}
          total={purchaseList.length}
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
  left: 100px;
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
  .index {
    flex-grow: 0.5;
    flex-basis: 0;
  }
  .name,
  .price,
  .bank {
    flex-grow: 1;
    flex-basis: 0;
  }
  .date {
    flex-grow: 1.2;
    flex-basis: 0;
  }
  .title {
    flex-grow: 2;
    flex-basis: 0;
  }
  .done {
    flex-grow: 0.5;
    flex-basis: 0;
  }
  .cancel {
    flex-grow: 0.5;
    flex-basis: 0;
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
  .index {
    flex-grow: 0.5;
    flex-basis: 0;
  }
  .date {
    flex-grow: 1.2;
    flex-basis: 0;
  }
  .name,
  .price,
  .bank {
    flex-grow: 1;
    flex-basis: 0;
  }
  .title {
    flex-grow: 2;
    flex-basis: 0;
  }
  .done {
    flex-grow: 0.5;
    flex-basis: 0;
  }
  .cancel {
    flex-grow: 0.5;
    flex-basis: 0;
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
