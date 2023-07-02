import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getProductList, Product, deleteProduct } from '../apis/api'
import styled from 'styled-components'
import { AdminBoard } from '../components/AdminBoard'
import { BoardPagination } from '../components/BoardPagination'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const ProductManage = () => {
  const [dataLoading, setdataLoading] = useState(false)

  //상품리스트
  const [productList, setProductList] = useState<Product[]>([])
  const [saveList, setSaveList] = useState<Product[]>([])

  //체크박스 저장
  const [selectChecked, setselectChecked] = useState<string[]>([])

  //페이지
  const [curPage, setCurPage] = useState(1)
  const [limitPage] = useState(12) //한번에 보여질 개수

  const CATEGORYOPTION = [
    { label: '카테고리', value: '카테고리' },
    { label: '페이스', value: '페이스' },
    { label: '립', value: '립' },
    { label: '아이', value: '아이' },
  ]
  const SORTOPTION = [
    { label: '정렬', value: '정렬' },
    { label: '낮은가격', value: '낮은가격' },
    { label: '높은가격', value: '높은가격' },
    { label: '품절상품', value: '품절상품' },
  ]

  const navigate = useNavigate()

  //상세로 이동
  const handleDoubleclickItem = (id: string) => {
    navigate('/productdetail', {
      state: {
        id,
      },
    })
  }

  //상품 삭제
  const handleClickDeleteProduct = async () => {
    await Promise.all(selectChecked.map((id) => deleteProduct(id)))
    alert('삭제가 완료되었습니다.')
    setselectChecked([])
    window.location.reload()
  }

  //카테고리 정렬
  const handleChangeCategoryoption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '카테고리') {
      setProductList([...saveList])
    } else {
      setProductList([...productList].filter((product) => product.tags.includes(e.target.value)))
    }
  }

  //일반 정렬
  const handleChangeSortoption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '낮은가격') {
      setProductList(
        [...productList].sort(function (a, b) {
          return a.price < b.price ? -1 : a.price > b.price ? 1 : 0
        }),
      )
    } else if (e.target.value === '높은가격') {
      setProductList(
        [...productList].sort(function (a, b) {
          return a.price > b.price ? -1 : a.price < b.price ? 1 : 0
        }),
      )
    } else if (e.target.value === '품절상품') {
      setProductList([...productList].filter((product) => product.isSoldOut === true))
    } else {
      setProductList(saveList)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setdataLoading(true)
        const data = await getProductList()
        setSaveList(data)
        setProductList(data)
      } catch (error) {
        setdataLoading(false)
        console.error('Error fetching products:', error)
      } finally {
        setdataLoading(false)
      }
    })()
  }, [])

  //페이지 계산
  const offset = (curPage - 1) * limitPage
  const lastPage = curPage * limitPage
  const firstPage = lastPage - limitPage
  const currentPages = (page: Product[]) => {
    let result = []
    result = page.slice(firstPage, lastPage)
    return result
  }

  return (
    <>
      <AdminBoard title="상품관리">
        {!dataLoading ? <Total>({productList.length})</Total> : ''}
        <Select className="category" onChange={handleChangeCategoryoption}>
          {CATEGORYOPTION.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select onChange={handleChangeSortoption}>
          {SORTOPTION.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <BoardHeader>
          <input type="checkbox" name="" id="" className="board-header chk" disabled />
          <span className="board-header index">No</span>
          <span className="board-header cate">카테고리</span>
          <span className="board-header title">상품명</span>
          <span className="board-header price">가격</span>
          <span className="board-header sold">품절여부</span>
        </BoardHeader>
        <BoardContent>
          {!dataLoading ? (
            productList.length > 0 ? (
              currentPages(productList).map((product, index) => (
                <BoardItem
                  key={product.id}
                  onDoubleClick={() => {
                    handleDoubleclickItem(product.id)
                  }}
                >
                  <input
                    type="checkbox"
                    className="board-header chk"
                    onChange={() => {
                      setselectChecked((prevList) => [...prevList, product.id])
                    }}
                  />
                  <span className="board-header index">{index + offset + 1}</span>
                  <span className="board-header cate">{product.tags}</span>
                  <span className="board-header title">{product.title}</span>
                  <span className="board-header price">{product.price}</span>
                  <span className="board-header sold">{product.isSoldOut ? 'Y' : 'N'}</span>
                </BoardItem>
              ))
            ) : (
              <EmptyList>등록된 상품이 없습니다.</EmptyList>
            )
          ) : (
            ''
          )}
        </BoardContent>
        <ButtonWrap>
          <DeleteButton onClick={handleClickDeleteProduct}>삭제</DeleteButton>
          <BoardPagination
            limitPage={limitPage}
            total={productList.length}
            paginate={setCurPage}
            curpage={curPage}
          />
          <AddButton to="/productadd">등록</AddButton>
        </ButtonWrap>
        {dataLoading && <LoadingSpinner />}
      </AdminBoard>
    </>
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
  .chk {
    flex-grow: 0.5;
  }
  .index {
    flex-grow: 0.5;
  }
  .title {
    flex-grow: 3;
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
  .cate {
    justify-content: left;
  }
  .chk {
    flex-grow: 0.5;
  }
  .index {
    flex-grow: 0.5;
  }
  .title {
    flex-grow: 3;
    justify-content: left;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.gray_1};
  }
`

const ButtonWrap = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const AddButton = styled(NavLink)`
  border: none;
  outline: none;
  width: 76px;
  height: 42px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

const DeleteButton = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
  width: 76px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  color: ${(props) => props.theme.colors.text_secondary};
`

const Select = styled.select`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 90px;
  height: 32px;
  border: 1px solid ${(props) => props.theme.colors.gray_3};
  border-radius: 6px;
  color: ${(props) => props.theme.colors.gray_3};
  outline: ${(props) => props.theme.colors.primary};
  &.category {
    right: 130px;
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
