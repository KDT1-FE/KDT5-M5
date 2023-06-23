import React from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Wrapper>
      <div>Loading...</div>
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);

  div {
    width: 200px;
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;

    font-size: 32px;
  }
`
