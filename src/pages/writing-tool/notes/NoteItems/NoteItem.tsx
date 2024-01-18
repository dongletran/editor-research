import "./NoteItem.scss";

function NoteItem(props: any) {
  const { publishDate, author, title, content, hashtag, dispatch, id } = props;

  const addNoteSelected = () => {
    dispatch({
      type: "SELECTED_NOTE",
      payload: {
        noteId: id,
      },
    });
  };

  return (
    <div className="note-item relative border rounded-md bg-white hover:!bg-[#E5E8E9] hover:!border-[#E0DFDE]">
      <div className="flex justify-between p-4">
        <div>
          <div className="w-full justify-between flex pr-3 mb-2 text-gray-500">
            {publishDate} ,{author}
            <button
              className="add-node-btn opacity-80 hover:opacity-100 invisible rounded-none border-none  px-3 py-1 bg-white text-sm ease-in-out"
              onClick={addNoteSelected}
            >
              <i className="bi bi-plus-square"></i> Add
            </button>
          </div>
          <p className="text-gray-500 mb-1">{title}</p>
          <p className="text-sm">{content}</p>
          {hashtag.length > 0 && <p>{hashtag.toString()}</p>}
        </div>
        <i className="bi bi-star cursor-pointer hover:text-yellow-500 ease-in-out"></i>
      </div>
    </div>
  );
}

export default NoteItem;
