import React from 'react'
import { NoteProps } from '../../../interface'

function NoteItem(props: NoteProps) {
  const { publishDate, author, title, content, hashtag } = props
  return (
    <div className='flex justify-between p-4 rounded-md bg-white'>
      <div>
        <div>
          <span>{publishDate},{author}</span>
        </div>
        <p>{title}</p>
        <p>{content}</p>
        {hashtag.length > 0 && <p>{hashtag.toString()}</p>}
      </div>
      <div>
        <i className='bi bi-star'></i>
      </div>
    </div>
  )
}

export default NoteItem