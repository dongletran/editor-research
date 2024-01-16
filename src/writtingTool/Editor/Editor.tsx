import React from 'react'
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constanst";
import { useCallback, useRef } from 'react';
import NoteItem from "../Notes/NoteItems/NoteItem";
import AddedNote from "./AddedNote/AddedNote";
const ReactEditorJS = createReactEditorJS()

function Editor() {
  const editorCore = useRef<any | null>(null)

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance
  }, [])
  const onSave = () => {
    editorCore.current!.save()
      .then((saveData: any) => console.log(saveData))
      .catch((error: any) => console.error("Error saving data:", error));
  };
  const addNote = {
    id: '5',
    publishDate: '2011',
    title: 'Title',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    hashtag: [],
    author: 'DongLe, HocNguyen'
  }
  return (
    <ReactEditorJS
      onInitialize={handleInitialize}
      holder='custom'
      tools={EDITOR_JS_TOOLS}
      defaultValue={{
        blocks: [{
          id: '1',
          type: 'helloTool',
          data: {
            message: ''
          }
        }]
      }}
    >
      <div id="custom">
        <AddedNote {...addNote} />
      </div>
    </ReactEditorJS>
  );
}

export default Editor