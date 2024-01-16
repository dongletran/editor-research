interface AddedNoteProps {
  content: string
}
function AddedNote(props: AddedNoteProps) {
  const { content } = props
  return (
    <div className="p-4 rounded-md">
      <h1>Insert reference</h1>
      <p>{content}</p>
    </div>
  )
}

export default AddedNote