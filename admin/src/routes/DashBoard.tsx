import { styled } from 'styled-components'
import {
  HiOutlineCircleStack,
  HiOutlineArchiveBox,
  HiOutlineArchiveBoxXMark,
  HiOutlineCube,
} from 'react-icons/hi2'
import { FiCheckSquare, FiMinusSquare } from 'react-icons/fi'
import { getPurchaseList, TransactionDetail, getProductList, Product } from '../apis/api'
import { useState, useEffect, useMemo } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { SalesChart } from '../components/SalesChart'

export const DashBoard = () => {
  const [dataLoading, setdataLoading] = useState(false)
  const [purchaseList, setpurchaseList] = useState<TransactionDetail[]>([])
  const [productList, setProductList] = useState<Product[]>([])
  const [purchaseMonth, setpurchaseMonth] = useState<TransactionDetail[]>([])

  const date = new Date()
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const todays = String(date.getDate()).padStart(2, '0')

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const purchases = await getPurchaseList()
        setpurchaseList(
          purchases.filter((list) => list.timePaid?.split('T')[0] === `${year}-${month}-${todays}`),
        )
        setpurchaseMonth(purchases.filter((list) => list.timePaid?.substr(5, 2) === month))
        const products = await getProductList()
        setProductList(products)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching products:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  function countCancel(lists: TransactionDetail[]) {
    return lists.filter((list) => list.isCanceled === true).length
  }
  const countcancel = useMemo(() => countCancel(purchaseList), [purchaseList])

  function countDone(lists: TransactionDetail[]) {
    return lists.filter((list) => list.done === true).length
  }
  const countdone = useMemo(() => countDone(purchaseList), [purchaseList])

  function countTotal(lists: TransactionDetail[]) {
    let total = 0
    lists.forEach((list) => (total = list.product.price + total))
    return total
  }
  const counttotal = useMemo(() => countTotal(purchaseList), [purchaseList])

  function countSoldout(lists: Product[]) {
    return lists.filter((list) => list.isSoldOut === true).length
  }
  const countsoldout = useMemo(() => countSoldout(productList), [productList])

  const countmonthcancel = useMemo(() => countCancel(purchaseMonth), [purchaseMonth])
  const countmonthdone = useMemo(() => countDone(purchaseMonth), [purchaseMonth])

  return (
    <>
      {!dataLoading ? (
        <BoardWrap>
          <TopWrap>
            <BoardLabel>오늘</BoardLabel>
            <TopBox>
              <TopCard>
                <CardText className="label">거래 수</CardText>
                <CardText className="data">{purchaseList.length}</CardText>
              </TopCard>
              <TopCard>
                <CardText className="label">거래 취소 수</CardText>
                <CardText className="data">{countcancel}</CardText>
              </TopCard>
              <TopCard>
                <CardText className="label">거래 확정 수</CardText>
                <CardText className="data">{countdone}</CardText>
              </TopCard>
              <TopCard className="total-sales">
                <CardText className="label">
                  <HiOutlineCircleStack />총 매출
                </CardText>
                <CardText className="data">{counttotal.toLocaleString('ko-KR')}원</CardText>
              </TopCard>
            </TopBox>
          </TopWrap>

          <MiddleWrap>
            <MiddleBox>
              <BoardLabel>상품 현황</BoardLabel>
              <MiddleCard>
                <div>
                  <HiOutlineArchiveBox />
                  <span>총 상품 수</span>
                  <span>{productList.length}</span>
                </div>
                <div>
                  <HiOutlineArchiveBoxXMark />
                  <span>현재 품절 상품 수</span>
                  <span>{countsoldout}</span>
                </div>
              </MiddleCard>
            </MiddleBox>
            <MiddleBox>
              <BoardLabel>이번달 거래</BoardLabel>
              <MiddleCard>
                <div>
                  <HiOutlineCube />
                  <span>거래 수</span>
                  <span>{purchaseMonth.length}</span>
                </div>
                <div>
                  <FiMinusSquare />
                  <span>거래 취소 수</span>
                  <span>{countmonthcancel}</span>
                </div>
                <div>
                  <FiCheckSquare />
                  <span>거래 확정 수</span>
                  <span>{countmonthdone}</span>
                </div>
              </MiddleCard>
            </MiddleBox>
          </MiddleWrap>
          <BottomWrap>
            <BoardLabel>매출 차트</BoardLabel>
            <Chart>
              <SalesChart />
            </Chart>
          </BottomWrap>
        </BoardWrap>
      ) : (
        ''
      )}
      {dataLoading && <LoadingSpinner />}
    </>
  )
}

const BoardWrap = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.text_primary};
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const BoardLabel = styled.p`
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`

const TopWrap = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 0.8;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
`
const TopBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
`

const TopCard = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.total-sales {
    flex-grow: 2;
  }
`

const CardText = styled.p`
  margin: 0;
  &.label {
    font-size: 18px;
  }
  &.data {
    font-size: 30px;
  }
`

const MiddleWrap = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`
const MiddleBox = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
`

const MiddleCard = styled.div`
  height: 100%;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray_1};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #fff;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    margin-left: 10px;
  }
`

const BottomWrap = styled.div`
  flex-grow: 1.5;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
`

const Chart = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.borderRadius};
  box-sizing: border-box;
`
