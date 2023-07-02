import { AdminBoard } from '../components/AdminBoard'
import styled from 'styled-components'
import { useState, useEffect, useMemo } from 'react'
import { SlArrowLeft } from 'react-icons/sl'
import { useLocation, NavLink } from 'react-router-dom'
import { getPurchaseList, TransactionDetail, editPurchase } from '../apis/api'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const PurchaseDetail = () => {
  const [dataLoading, setdataLoading] = useState(false)
  const [purchaseDetail, setpurchaseDetail] = useState<TransactionDetail[]>([])
  const [iscanceled] = useState(false)
  const [Done] = useState(false)

  const location = useLocation()
  const id = location.state.id

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getPurchaseList()
        setpurchaseDetail(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching products:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  function filtering(lists: TransactionDetail[]) {
    return lists.filter((list) => list.detailId === id)[0]
  }
  const filteredDetail = useMemo(() => filtering(purchaseDetail), [purchaseDetail])

  const handleClickButtons = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText === '취소해제' || e.currentTarget.innerText === '거래취소') {
      const isCanceled = !iscanceled
      const done = Done
      await editPurchase(id, { isCanceled, done })
    } else if (
      e.currentTarget.innerText === '완료해제' ||
      e.currentTarget.innerText === '거래완료'
    ) {
      const done = !Done
      const isCanceled = iscanceled
      await editPurchase(id, { isCanceled, done })
    }
    alert('변경이 완료되었습니다.')
    window.location.reload()
  }

  return (
    <>
      <PrevButton to="/purchase">
        <SlArrowLeft />
      </PrevButton>
      <AdminBoard title="거래 내역 상세 정보">
        {!dataLoading && filteredDetail ? (
          <>
            <ButtonWrap>
              <Button value="cancel" onClick={(e) => handleClickButtons(e)}>
                {filteredDetail.isCanceled ? '취소해제' : '거래취소'}
              </Button>
              <Button value="completed" onClick={(e) => handleClickButtons(e)}>
                {filteredDetail.done ? '완료해제' : '거래완료'}
              </Button>
            </ButtonWrap>

            <DetailWrap>
              <ProductWrap>
                <ImageBox>
                  <img src={filteredDetail.product?.thumbnail || ''} alt="" />
                </ImageBox>
                <ProductInfo>
                  <Label>거래 상품 정보</Label>
                  <Info>
                    <Labels>카테고리</Labels> <span>{filteredDetail.product?.tags}</span>
                  </Info>
                  <Info>
                    <Labels>상품명</Labels> <span>{filteredDetail.product?.title}</span>
                  </Info>
                  <Info>
                    <Labels>가격</Labels>{' '}
                    <span>{filteredDetail.product?.price.toLocaleString('ko-KR')}원</span>
                  </Info>
                </ProductInfo>
              </ProductWrap>
              <InfoBox>
                <Inner>
                  <Label>거래 정보</Label>
                  <div>
                    <Info>
                      <Labels>거래일</Labels>{' '}
                      <span>{filteredDetail.timePaid?.split('.')[0].split('T')[0]}</span>
                    </Info>
                    <Info>
                      <Labels>거래시간</Labels>{' '}
                      <span>{filteredDetail.timePaid?.split('.')[0].split('T')[1]}</span>
                    </Info>
                    <Info>
                      <Labels>취소여부</Labels>{' '}
                      <span>{filteredDetail.isCanceled ? '취소됨' : '취소전'}</span>
                    </Info>
                    <Info>
                      <Labels>완료여부</Labels>{' '}
                      <span>{filteredDetail.done ? '완료됨' : '완료전'}</span>
                    </Info>
                  </div>
                </Inner>
                <Inner>
                  <Label>구매자 정보</Label>
                  <div>
                    <Info>
                      <Labels>구매자 이메일</Labels> <span>{filteredDetail.user?.email}</span>
                    </Info>
                    <Info>
                      <Labels>구매자 이름</Labels> <span>{filteredDetail.user?.displayName}</span>
                    </Info>
                  </div>
                </Inner>

                <Inner>
                  <Label>계좌 정보</Label>
                  <div>
                    <Info>
                      <Labels>은행명</Labels> <span>{filteredDetail.account?.bankName}</span>
                    </Info>
                    <Info>
                      <Labels>계좌번호</Labels> <span>{filteredDetail.account?.accountNumber}</span>
                    </Info>
                  </div>
                </Inner>
              </InfoBox>
            </DetailWrap>
          </>
        ) : (
          ''
        )}
        {dataLoading && <LoadingSpinner />}
      </AdminBoard>
    </>
  )
}

const PrevButton = styled(NavLink)`
  position: fixed;
  top: 15px;
  left: 240px;
  width: 35px;
  height: 35px;
  background-color: #fff;
  z-index: 11;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  justify-content: right;
  gap: 10px;
  box-sizing: border-box;
`

const Button = styled.button`
  right: 96px;
  bottom: 0;
  background-color: #fff;
  border: none;
  outline: none;
  width: 76px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  color: ${(props) => props.theme.colors.text_secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`
const DetailWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
`

const ProductWrap = styled.div`
  padding-top: 20px;
  display: flex;
  width: 600px;
  gap: 10px;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ImageBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  img {
    width: 100%;
  }
`
const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 50px;
`

const Inner = styled.div`
  width: 600px;
  display: flex;
  gap: 10px;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`

const Label = styled.p`
  font-size: 20px;
  font-weight: 700;
  width: 130px;
  margin: 0;
`
const Labels = styled.span`
  width: 130px;
  margin: 0;
`

const Info = styled.p`
  font-size: 18px;
  display: flex;
  margin: 0;
`
