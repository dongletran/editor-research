import { get, isEmpty, keyBy } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import NoteSelected from "../../pages/writing-tool/editor/note-selected/NoteSelected";

function AIForm({
  top,
  onCloseForm,
  blockId,
  onInsertAnswer,
  notes,
  idsSelected,
}: any) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState({
    items: {},
    selected: {},
  });

  const [loading, setLoading] = useState({
    submit: false,
  });

  const isSelectedAnswer = useMemo(() => {
    return !isEmpty(answers.selected) && true;
  }, [answers]);

  const aiAPIFake = async (prompt: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return [
      {
        id: "c793f0c2-8c6b-43df-b0b2-a0060f9d5c94",
        content:
          "The study found that the Italian version of the test retained the same three-factor structure as the original Spanish version, with similar parameters across both countries. The SAS scores showsd a negative correlation with mathematical skills, selt-efficacy, and attitudes towards statistics.",
      },
      {
        id: "23aa062d-3a3e-4e97-ba2f-9c2b30c27867",
        content:
          "The Italian version of the test was consistent with the original Spanish version, displaying a three-factor structure. Moreover, the results demonstrated that the factor model parameters were substantiolly equivalent across the countries. The SAS results seemed to have a negative correlation with mathematical proliciency, selfconfidence, and attitudes towards statistics.",
      },
    ];
  };

  const handleCallAIFakeAPI = async () => {
    setLoading((preState) => ({ ...preState, submit: true }));
    const results = await aiAPIFake(prompt);
    setAnswers((preState) => ({
      ...preState,
      items: keyBy(results, "id"),
      selected: get(Object.values(results), "0"),
    }));

    setLoading((preState) => ({ ...preState, submit: false }));
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      await handleCallAIFakeAPI();
    }
  };

  const reCallAIDFakeAPI = async () => {
    setAnswers({
      items: {},
      selected: {},
    });
    await handleCallAIFakeAPI();
  };

  const handleInsertAnswer = async () => {
    return onInsertAnswer(answers.selected, blockId);
  };

  const renderAction = useCallback(() => {
    if (isSelectedAnswer) {
      return (
        <div className="flex gap-x-2">
          <button className="py-0.5 px-2 bg-gray-300" onClick={onCloseForm}>
            Cancel
          </button>
          <button
            className="py-0.5 px-2 bg-gray-300"
            onClick={() => reCallAIDFakeAPI()}
          >
            <i className="bi bi-arrow-clockwise rotate-45" />
          </button>
          <button
            className="py-0.5 px-2 text-white bg-primary"
            onClick={handleInsertAnswer}
          >
            Insert
          </button>
        </div>
      );
    }

    return (
      <button className="py-0.5 px-2 bg-gray-300" onClick={onCloseForm}>
        Cancel
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectedAnswer]);

  return (
    <div
      className="w-[94%] absolute left-[3%] p-[1px] bg-gradient-to-r from-indigo-500 to-green-200 z-10 shadow-lg shadow-blue-200/50"
      style={{ top: `${top || 0}px` }}
    >
      <div className="bg-white">
        <div className="">
          <input
            className="w-full border-none rounded-none focus:outline-none px-2 py-1 min-h-[38px]"
            value={prompt}
            onKeyDown={handleKeyDown}
            autoFocus
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading.submit || (!isEmpty(answers.selected) && true)}
          />
        </div>
        <div className="border-t border-b border-gray-300">
          {!isSelectedAnswer ? (
            <div className="flex gap-x-2 justify-center items-center  py-1 px-2">
              <div className="w-[96%]">
                <p className="mb-0 text-gray-400 text-md">
                  Tell AI {`${prompt ? `"${prompt}"` : ""}`}
                </p>
                <NoteSelected
                  notes={notes}
                  idsSelected={idsSelected}
                  isShowAIForm={false}
                />
              </div>

              <i
                className="bi bi-arrow-90deg-up -rotate-90 px-1 bg-gray-300 cursor-pointer"
                onClick={handleCallAIFakeAPI}
              />
            </div>
          ) : (
            <TypeAnimation
              sequence={[get(answers, "selected.content") ?? ""]}
              speed={99}
              wrapper="p"
              className="px-2 py-2"
            />
          )}
        </div>
        <div className="flex w-full justify-between px-2 py-2 items-center ">
          {loading.submit ? (
            <div className="flex items-center">
              <div
                className="spinner-grow !w-[4px] !h-[4px] mr-1"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <div
                className="spinner-grow !w-[4px] !h-[4px] mr-1"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <div
                className="spinner-grow !w-[4px] !h-[4px] mr-1"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mb-0 ml-1">Generating</p>
            </div>
          ) : (
            <div className="text-gray-400 text-sm flex items-center mb-0">
              <i className="bi bi-robot text-primary" />{" "}
              <p className="mb-0 ml-1">AI Intelligence</p>
            </div>
          )}

          {renderAction()}
        </div>
      </div>
    </div>
  );
}

export default AIForm;
