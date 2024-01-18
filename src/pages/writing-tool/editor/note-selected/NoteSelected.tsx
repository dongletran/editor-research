import { get, isEmpty, map } from "lodash";

function NoteSelected({ idsSelected, notes, isShowAIForm }: any) {
  if (isEmpty(idsSelected) || isShowAIForm) {
    return null;
  }

  return (
    <div className="p-3 rounded-md">
      {map(Object.values(idsSelected), (selected: any) => (
        <div
          className="bg-[#E5E8E9] border border-[#E0DFDE] rounded-md p-3 mb-4"
          key={selected.id}
        >
          <p className="mb-1 flex items-center text-gray-500">
            <i className="bi bi-book mr-1" /> Insert reference
          </p>
          <p className="text-sm">{get(notes, `${selected.id}.content`)}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteSelected;
