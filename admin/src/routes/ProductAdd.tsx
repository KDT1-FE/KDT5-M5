import { AdminBoard } from '../components/AdminBoard'
import { AdminForm } from '../components/AdminForm'

export const ProductAdd = () => {
  return (
    <AdminBoard title="상품 등록">
      <AdminForm formtype="등록" />
    </AdminBoard>
  )
}
