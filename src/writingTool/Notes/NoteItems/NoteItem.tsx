import { NoteProps } from "../../../interface";
import './NoteItem.scss'

function NoteItem(props: NoteProps) {
  const { publishDate, author, title, content, hashtag } = props;
  return (
    <div className="note-item relative rounded-md bg-white">
      <div className="backdrop rounded-md"></div>
      <button className="btn-add-note opacity-0 rounded-md border-none hidden px-4 py-1 bg-slate-100"><i className="bi bi-plus-square"></i> Add</button>
      <div className="flex justify-between p-4">
        <div>
          <span>
            {publishDate},{author}
          </span>
          <p>{title}</p>
          <p>{content}</p>
          {hashtag.length > 0 && <p>{hashtag.toString()}</p>}
        </div>
        <div>
          <i className="bi bi-star"></i>
        </div>
      </div>
    </div>

  );
}

export default NoteItem;
