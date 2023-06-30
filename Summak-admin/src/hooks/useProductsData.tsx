import { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/lib/table/interface'
import { Input, Button } from 'antd'

// * production cloumn에 render기능을 추가합니다.
export function useHydrationProductColumn<T extends object[]>(
  columns: ColumnsType<T>
) {
  const [column, setColumn] = useState([] as ColumnsType<T>)

  // * onClickBtn에 submit, delete 이벤트를 추가할 수 있습니다.
  const onClickBtn: OnClickBtn = {
    submit: function () {
      console.warn('Submit button is not implemented.')
    },
    delete: function () {
      console.warn('Delete button is not implemented.')
    },
  }

  useEffect(() => {
    columns.forEach((column) => {
      switch (column.key) {
        case 'title':
          column.render = (title: string) => <Input defaultValue={title} />
          break
        case 'description':
          column.render = (description: string) => (
            <Input.TextArea
              style={{
                padding: '10px 0 0 20px',
                minHeight: '100px',
                minWidth: '500px',
              }}
              defaultValue={description}
            />
          )
          break
        case 'price':
          column.render = (price: number) => (
            <Input
              defaultValue={price.toLocaleString('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              })}
            />
          )
          break
        case 'tags':
          column.render = (tags: string[]) => <Input defaultValue={tags} />
          break
        case 'submit':
          column.render = () => (
            <Button
              type='primary'
              style={{ maxWidth: '60px' }}
              onClick={onClickBtn.submit}
            >
              제출
            </Button>
          )
          break
        case 'delete':
          column.render = () => (
            <Button
              danger
              style={{ maxWidth: '60px' }}
              onClick={onClickBtn.delete}
            >
              삭제
            </Button>
          )
          break
      }
    })
    setColumn(columns)
  }, [])

  return [column, onClickBtn] as [ColumnsType<T>, OnClickBtn]
}

interface OnClickBtn {
  submit: (event: unknown) => unknown
  delete: (event: unknown) => unknown
}
