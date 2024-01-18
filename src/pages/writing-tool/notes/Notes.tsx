import React from "react";
import NoteItem from "./NoteItems/NoteItem";

function Notes({ notes, dispatch }: any) {
  return (
    <div className="flex gap-y-4 flex-col overscroll-y-auto">
      {(Object.values(notes) ?? []).map((note: any) => {
        return <NoteItem {...note} key={note.id} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default Notes;
