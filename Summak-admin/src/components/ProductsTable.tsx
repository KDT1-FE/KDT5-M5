import { Table } from 'antd'
import { productCloumns } from '../constants'
import { Product } from '../pages/Products'
import { useHydrationProductColumn } from '../hooks/useProductsData'
import { getRowProductValues } from '../utiles'
import { deleteProduct, updateProduct } from '../apis/admin/product'
import { useNavigate } from 'react-router-dom'

type Props = {
  products: Product[]
}
export default function ProductsTable({ products }: Props) {
  const navigate = useNavigate()
  const [columns, onClickBtn] = useHydrationProductColumn(productCloumns)

  // * 제출 버튼 클릭시
  onClickBtn.submit = async (e) => {
    const target = (e as React.MouseEvent<HTMLButtonElement>)
      .target as HTMLSpanElement
    const tr = target.closest('tr') as HTMLTableRowElement
    const product = getRowProductValues(tr)
    const { id, ...restProduct } = product
    const isUpdated = await updateProduct(id, restProduct)
    if (isUpdated) {
      const yes = confirm('수정되었습니다. 새로고침 하시겠습니까?')
      yes && navigate('/')
    } else {
      alert('수정에 실패하였습니다.')
    }
  }

  // * 삭제 버튼 클릭시
  onClickBtn.delete = async (e) => {
    const yes = confirm('정말 삭제하시겠습니까?')
    if (!yes) return
    const target = (e as React.MouseEvent<HTMLButtonElement>)
      .target as HTMLSpanElement
    const tr = target.closest('tr') as HTMLTableRowElement
    const product = getRowProductValues(tr)
    const isDeleted = await deleteProduct(product.id)
    if (isDeleted) {
      const yes = confirm('삭제되었습니다. 새로고침 하시겠습니까?')
      yes && navigate('/')
    } else {
      alert('삭제에 실패하였습니다.')
    }
  }

  return (
    <Table
      rowKey='id' // set the unique key for each row property 'id'
      columns={columns}
      // * antd type error 이중 배열을 인자로 받고 있는데 실제로는 object[]를 인자로 받고 있음
      dataSource={products as unknown as Product[][]}
    />
  )
}
