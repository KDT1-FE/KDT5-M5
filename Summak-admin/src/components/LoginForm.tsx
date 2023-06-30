import { Button, Form, Input } from 'antd'

type Props = {
  onSubmit: (e: LoginFormProps) => void
}
export default function LoginForm({ onSubmit: onSubmitForm }: Props) {
  function onFinish(e: LoginFormProps) {
    onSubmitForm(e)
  }

  function onFinishFailed() {
    alert('입력된 아이디 비밀번호 양식이 일치하지 않습니다.')
  }

  return (
    <Form
      name='basic'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        paddingTop: 200,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export type LoginFormProps = {
  username: string
  password: string
}
