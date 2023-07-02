import { styled } from 'styled-components'
export const AdminBoard = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <>
      <Board>
        <BoardTitle>
          <Title>{title}</Title>
        </BoardTitle>
        {children}
      </Board>
    </>
  )
}

const Board = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.text_primary};
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.colors.gray_2};
  border-radius: ${(props) => props.theme.borderRadius};
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  position: relative;
`
const BoardTitle = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_3};
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-size: 20px;
`
