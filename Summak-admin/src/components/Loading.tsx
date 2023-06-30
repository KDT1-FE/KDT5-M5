import { Alert, Space, Spin } from 'antd'
export default function Loading() {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Spin tip='loading...' size='large'>
        <Alert
          message='Alert message title'
          description='곧 컨텐츠가 표시됩니다.'
          type='info'
          style={{ width: '100%', height: '100vh' }}
        />
      </Spin>
    </Space>
  )
}
