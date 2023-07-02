import { useState, useEffect } from 'react'
import { ListPagination } from '../../components/mypage/ListPagination'
import { PageHeader } from '../../components/mypage/PageHeader'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getPurchaselist } from '../../apis/api'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'


export const PurchaseList = () => {
  const navigate = useNavigate()

  const [curPage, setCurPage] = useState(1)
  const [dataLoading, setdataLoading] = useState(false)
  const [purchaseList, setpurchaseList] = useState([])

  //페이지 계산
  const limitPage = 4
  const lastPage = curPage * limitPage
  const firstPage = lastPage - limitPage
  const currentPages = (page: Array<{ product: { thumbnail: string; title: string; price: number; }, timePaid: string, detailId: string }>) => {
    return page.slice(firstPage, lastPage);
  };
  
  
  

  const handleClickMore = (id: string) => {
    navigate('/MyPage/PurchaseDetails', {
      state: {
        id,
      },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setdataLoading(true)
        const data = await getPurchaselist()
        setpurchaseList(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching purchase list:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  return (
    <Wrap>
      <PageHeader title="구매 내역" />
      {!purchaseList ? (
        <EmptyList>구매 내역이 없습니다.</EmptyList>
      ) : (
        <>
          <Total>({purchaseList.length})</Total>
          <Inner>
            {currentPages(purchaseList).map((data, index) => (
              <ListItem key={index}>
                <ImageBox>
                  <img src={data.product.thumbnail} alt="" />
                </ImageBox>
                <Info>
                  <p className="title">{data.product.title.split('-')[0]}</p>
                  <p className="name">{data.product.title.split('-')[1]} / 1개</p>
                  <p className="price">{data.product.price.toLocaleString('ko-KR')}원</p>
                  <p className="time">{data.timePaid.slice(0, 10)}</p>
                </Info>
                <MoreButton onClick={() => handleClickMore(data.detailId)}>자세히</MoreButton>
              </ListItem>
            ))}
          </Inner>
          <BottomInner>
            {purchaseList.length > 0 ? (
              <ListPagination
                limitPage={limitPage}
                total={purchaseList.length}
                paginate={setCurPage}
                curpage={curPage}
              />
            ) : (
              ''
            )}
          </BottomInner>
          {dataLoading && <LoadingSpinner />}
        </>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const Inner = styled.div`
  width: 100%;
  height: 540px;
  overflow: hidden;
`
const ListItem = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;
`

const ImageBox = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid #8e8e8e;
  img {
    width: 100%;
  }
`
const Info = styled.div`
  height: 120px;
  .title {
    font-size: 20px;
  }
  .name {
    font-size: 16px;
    color: #8e8e8e;
    margin-bottom: 15px;
  }
  .price {
    font-size: 20px;
  }
  .time {
    font-size: 16px;
  }
`

const Total = styled.p`
  position: absolute;
  top: 5px;
  left: 85px;
  color: #ffa9be;
  font-size: 20px;
`

const BottomInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const MoreButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #8e8e8e;
  text-decoration: underline;
`
const EmptyList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #ffa9be;
`
