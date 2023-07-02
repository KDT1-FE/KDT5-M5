import { styled } from 'styled-components'

export const PageHeader = ({ title }: { title: string }) => {
  return <HeaderWrap>{title}</HeaderWrap>
}

const HeaderWrap = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #8e8e8e;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`
