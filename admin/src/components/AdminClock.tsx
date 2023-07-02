import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
export const AdminClock = () => {
  const [clock, setClock] = useState('')
  const [day, setDay] = useState('')

  useEffect(() => {
    const time = new Date()
    setDay(time.getFullYear() + '년' + (time.getMonth() + 1) + '월' + time.getDate() + '일')
  }, [])

  useEffect(() => {
    const Timer = setInterval(() => {
      const time = new Date()
      setClock(time.getHours() + '시' + time.getMinutes() + '분' + time.getSeconds() + '초')
    }, 1000)
    return () => {
      clearInterval(Timer)
    }
  }, [])

  return (
    <DateWrap>
      <span>{day}</span>
      <span>{clock}</span>
    </DateWrap>
  )
}

const DateWrap = styled.div`
  font-size: 14px;
  position: absolute;
  right: 74px;
  display: flex;
  gap: 5px;
  color: ${(props) => props.theme.colors.text_secondary};
`
