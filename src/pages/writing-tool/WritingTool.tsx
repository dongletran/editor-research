import { useReducer } from "react";
import { keyBy } from "lodash";

import { notesMockData } from "../../mock";
import Editor from "./editor/Editor";
import Notes from "./notes/Notes";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SELECTED_NOTE":
      const { noteId } = action.payload;
      return {
        ...state,
        idsSelected: {
          ...state.idsSelected,
          [`${noteId}`]: {
            id: noteId,
          },
        },
      };

    case "REMOVE_NOTE_ID_SELECTED":
      return {
        ...state,
        idsSelected: {},
      };
    default:
      return state;
  }
};

function WritingTool() {
  const [notes, dispatch] = useReducer(reducer, {
    items: keyBy(notesMockData, "id"),
    idsSelected: {},
  });

  console.log("notes", notes);

  return (
    <div className="flex min-h-[100vh] bg-slate-200">
      {/* Section 2 */}
      <div className="w-[20%] h-full p-4">
        <div className="bg-white h-full rounded-md mt-2"></div>
      </div>
      <div className="w-[40%] h-full p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            <h3 className="text-lg">
              Untitled document <i className="bi bi-arrow-down-circle"></i>
            </h3>
            <span className="text-xs">0 word</span>
          </div>
          <div>
            <button className="border border-[#333] rounded-md p-1">
              Clean up all notes
            </button>
          </div>
        </div>
        <div className="bg-white h-full ">
          <Editor
            notes={notes.items}
            dispatch={dispatch}
            idsSelected={notes.idsSelected}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-[40%] h-full p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <h3 className="text-lg">
              References <i className="bi bi-dot text-lg"></i> 15 notes
            </h3>
            <span>
              Sort <i className="bi bi-filter"></i>
            </span>
          </div>
          <div className="relative">
            <i className="absolute inset-y-0 right-3 flex items-center ps-3 pointer-events-none bi bi-search"></i>
            <input
              type="text"
              placeholder="Search"
              className="block ps-10 border p-2 rounded w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="h-full rounded-md mt-2">
          <Notes notes={notes.items} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}

export default WritingTool;
