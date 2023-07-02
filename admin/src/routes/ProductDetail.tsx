import { useState, useEffect } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { SlArrowLeft } from 'react-icons/sl'
import { AdminBoard } from '../components/AdminBoard'
import { getProduct, ProductDetails, deleteProduct } from '../apis/api'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const ProductDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.state.id
  const [dataLoading, setdataLoading] = useState(false)

  const [product, setProduct] = useState<ProductDetails>({
    id: '',
    title: '',
    price: 0,
    description: '',
    tags: [],
    thumbnail: '',
    photo: '',
    isSoldOut: false,
    reservations: [],
    discountRate: 0,
  })

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getProduct(id)
        setProduct(data as ProductDetails)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching products:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [id])

  //상품 삭제
  const handleClickDeleteProduct = async () => {
    const results = await deleteProduct(id)
    if (!results) return
    if (results) {
      alert('삭제되었습니다.')
      navigate('/product')
    }
  }

  //상품 수정
  const handleClickEditProduct = async (product: ProductDetails) => {
    navigate('/productedit', {
      state: {
        product,
      },
    })
  }

  return (
    <>
      <PrevButton to="/product">
        <SlArrowLeft />
      </PrevButton>
      <AdminBoard title="상품 상세 정보">
        <ButtonWrap>
          <Button onClick={handleClickDeleteProduct}>삭제</Button>
          <Button
            onClick={() => {
              handleClickEditProduct(product as ProductDetails)
            }}
          >
            수정
          </Button>
        </ButtonWrap>
        {!dataLoading && (
          <DetailWrap>
            <Inner>
              <ImageBox>
                <img src={product.thumbnail || ''} alt="" />
              </ImageBox>
              <InfoBox>
                <Label>카테고리</Label>
                <Info>{product.tags} 메이크업</Info>
                <Label>상품명</Label>
                <Info>{product.title}</Info>
                <Label>가격</Label>
                <Info>{product.price}원</Info>
                <Label>품절 여부</Label>
                <Info>{product.isSoldOut ? 'Y' : 'N'}</Info>
                <Label>상품 상세 설명</Label>
                <Info>{product.description}</Info>
              </InfoBox>
            </Inner>
            <DetailImageBox>
              <Label>상품 상세 이미지</Label>
              <img src={product.photo || ''} alt="" />
            </DetailImageBox>
          </DetailWrap>
        )}
        {dataLoading && <LoadingSpinner />}
      </AdminBoard>
    </>
  )
}

const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  justify-content: right;
  gap: 10px;
  //margin-top: 20px;
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

const DetailWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
`

const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`

const ImageBox = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  img {
    width: 100%;
  }
`
const InfoBox = styled.div`
  width: calc(100% - 420px);
  max-width: 700px;
`

const Label = styled.span`
  font-size: 20px;
  font-weight: 700;
`

const Info = styled.p`
  font-size: 18px;
`

const DetailImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  img {
    position: absolute;
    top: 30px;
    width: 100%;
  }
`
