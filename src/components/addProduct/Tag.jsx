import React from 'react'
import styled from 'styled-components'

const Tag = ({ tags, tag, onClick }) => {
  return (
    <Warpper>
      {tag}
      <button
        type="button"
        onClick={() => {
          onClick(tags, tag)
        }}>
        삭제
      </button>
    </Warpper>
  )
}

const Warpper = styled.div`
  margin-top: 10px;
  font-size: 18px;
  button {
    height: 20px;
    margin-left: 10px;
    padding: 15px 5px;
    line-height: 4px;
  }
`

export default Tag
