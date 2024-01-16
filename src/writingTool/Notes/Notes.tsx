import React from 'react'
import NoteItem from './NoteItems/NoteItem'
import { NoteProps } from '../../interface'
const mockDATA: NoteProps[] = [
  {
    id: '1',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  },
  {
    id: '2',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  },
  {
    id: '3',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  },
  {
    id: '4',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  },
  {
    id: '5',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  },
]

function Notes() {
  return (
    <div className='flex gap-y-4 flex-col overscroll-y-auto'>
      {
        mockDATA.map((note, index) => {
          return <NoteItem {...note} key={index} />
        })
      }
    </div>
  )
}

export default Notes