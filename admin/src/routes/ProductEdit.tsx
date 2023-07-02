import { AdminBoard } from '../components/AdminBoard'
import { AdminForm } from '../components/AdminForm'

export const ProductEdit = () => {
  return (
    <AdminBoard title="상품 수정">
      <AdminForm formtype="수정" />
    </AdminBoard>
  )
}
