import { styled } from 'styled-components'

interface BoardPaginationProps {
  limitPage: number
  total: number
  paginate: (page: number) => void
  curpage: number
}

export const BoardPagination: React.FC<BoardPaginationProps> = ({
  limitPage,
  total,
  paginate,
  curpage,
}) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(total / limitPage); i += 1) {
    pageNumbers.push(i)
  }

  const handleClickFirst = () => {
    paginate(pageNumbers[0])
  }

  const handleClickLast = () => {
    paginate(pageNumbers[pageNumbers.length - 1])
  }

  return (
    <PageButtonWrap>
      <PageMoveButton onClick={handleClickFirst}>처음</PageMoveButton>
      {pageNumbers.map((page, index) => (
        <PageButton
          key={index}
          value={page}
          onClick={() => paginate(page)}
          className={page === curpage ? 'active' : ''}
        >
          {page}
        </PageButton>
      ))}
      <PageMoveButton onClick={handleClickLast}>마지막</PageMoveButton>
    </PageButtonWrap>
  )
}

const PageButtonWrap = styled.div`
  display: flex;
  align-items: center;
`

const PageButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const PageMoveButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.gray_3};
  width: 60px;
  height: 25px;
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  box-sizing: border-box;
`
