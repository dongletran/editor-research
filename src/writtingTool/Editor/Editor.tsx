import React from 'react'
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constanst";
import { useCallback, useRef } from 'react';
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
    </ReactEditorJS>
  );
}

export default Editor