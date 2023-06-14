import React from 'react'

const Tag = ({ tags, tag, onClick }) => {
  return (
    <div>
      {tag}
      <button
        type="button"
        onClick={() => {
          onClick(tags, tag)
        }}>
        X
      </button>
    </div>
  )
}

export default Tag
