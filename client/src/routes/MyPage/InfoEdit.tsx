import { PageHeader } from '../../components/mypage/PageHeader'
import { styled } from 'styled-components'

export const InfoEdit = () => {
  return (
    <Wrap>
      <PageHeader title="개인 정보 수정" />
    </Wrap>
  )
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`
