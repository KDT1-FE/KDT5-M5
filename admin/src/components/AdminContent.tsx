import { styled } from 'styled-components'

export const AdminContent = ({ children }: { children: React.ReactNode }) => {
  return <Wrap>{children}</Wrap>
}

const Wrap = styled.div`
  width: calc(100% - 230px);
  height: calc(100% - 64px);
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  background-color: #f8f8f8;
  padding: 30px 74px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.primary};
  overflow: hidden;
`
