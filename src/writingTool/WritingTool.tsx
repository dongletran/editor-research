import Editor from "./Editor/Editor";
import Notes from "./Notes/Notes";

function WritingTool() {
  return (
    <div className="flex min-h-[100vh] bg-slate-200">
      {/* Section 2 */}
      <div className="w-[20%] h-full p-4">
        <div className="bg-white h-full rounded-md mt-2"></div>
      </div>
      <div className="w-[40%] h-full p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            <h1 className="text-lg">
              Untitled document <i className="bi bi-arrow-down-circle"></i>
            </h1>
            <span className="text-xs">0 word</span>
          </div>
          <div>
            <button className="border border-[#333] rounded-md p-1">
              Clean up all notes
            </button>
          </div>
        </div>
        <div className="bg-white h-full ">
          <Editor />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-[40%] h-full p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <h1 className="text-lg">
              References <i className="bi bi-dot text-lg"></i> 15 notes
            </h1>
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
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default WritingTool;
