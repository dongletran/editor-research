import './App.css';
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constanst";
import { useCallback, useRef } from 'react';
const ReactEditorJS = createReactEditorJS()

function App() {
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
        time: 1635603431943,
        blocks: [{
          id: 'ầgdghafsdh',
          type: 'helloTool',
          data: {
            message: 'Hello Tool'
          }
        }]
      }}
    >
      <div id='custom'><button onClick={onSave}>Log Data</button></div>
    </ReactEditorJS>
  );
}

export default App;
