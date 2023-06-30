import type { ColumnsType } from 'antd/lib/table/interface'
import { Table } from 'antd'
import { userColumns } from '../constants'
import { User } from '../apis/admin/users'

type Props = {
  users: User[]
}
export default function UsersTable({ users }: Props) {
  return (
    <Table
      rowKey='email' // set the unique key for each row property 'id'
      columns={userColumns as unknown as ColumnsType<object[]>}
      dataSource={users as unknown as User[][]}
    />
  )
}
