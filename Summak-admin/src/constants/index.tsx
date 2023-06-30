import { Link } from 'react-router-dom'
import { Input } from 'antd'

export const LOCAL_ID = 'sumtendo_admin_id'
export const LOCAL_PASSWORD = 'sumtendo_admin_password'

export const menuItems = [
  {
    key: 'center',
    icon: <Link to='/'>Sumtendo Admin</Link>,
  },
  {
    key: 'settings',
    icon: <Link to='/users'>User Management</Link>,
  },
  {
    key: 'logout',
    icon: <Link to='/products'>Product Management</Link>,
  },
]

export type ProductCloumn = {
  title: string
  dataIndex: string
  key: string
}

export const productCloumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => (
      <div
        style={{
          maxWidth: '40px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {id}
      </div>
    ),
  },
  {
    title: 'Product Name',
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => <Input defaultValue={title} />,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description: string) => (
      <Input.TextArea
        style={{ padding: '10px 0 0 20px', minHeight: '100px' }}
        defaultValue={description}
      />
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => (
      <Input
        defaultValue={price.toLocaleString('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        })}
      />
    ),
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) => <Input defaultValue={tags} />,
  },
  {
    title: '변경',
    dataIndex: 'submit',
    key: 'submit',
  },
  {
    title: '삭제',
    dataIndex: 'delete',
    key: 'delete',
  },
]

export const userColumns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Profile Image',
    dataIndex: 'profileImg',
    key: 'profileImg',
  },
]
