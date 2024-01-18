/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useRef } from "react";
import { get, keyBy, round } from "lodash";

import ParagraphCustom from "../../components/paragraph-custom";

import "./Editor.scss";

import AIForm from "../../components/ai-form";
import NoteSelected from "./note-selected/NoteSelected";

const ReactEditorJS = createReactEditorJS();

export const EDITOR_JS_TOOLS = {
  "paragraph-custom": {
    class: ParagraphCustom,
    toolbar: false,
  },
};

export const INITIAL_PROPERTY_AI_FORM = {
  isShow: false,
  top: 0,
  blockId: "",
  blocksElement: null,
};

function Editor({ notes, dispatch, idsSelected }: any) {
  const editorCore = useRef<any | null>(null);

  const [propertyAIForm, setPropertyAiForm] = useState(
    INITIAL_PROPERTY_AI_FORM
  );

  const [blocks, setBlocks] = useState({});

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const openAIForm = (
    string: string,
    blockId: string,
    indexBlock: number,
    blocksElement: any
  ) => {
    const regex = /\/ai[\s.,;!?]*$/;
    if (regex.test(string)) {
      const element = document.querySelector(`[data-id="${blockId}"]`) as any;
      const rect = element?.getBoundingClientRect();
      console.log("rect", rect);

      const yPosition = get(rect, "y");
      const height = get(rect, "height");
      let top = round(yPosition - round(height / 2, 10), 10);
      if (height > yPosition) {
        top = round(height, 10);
      }

      return setPropertyAiForm((preState) => ({
        ...preState,
        isShow: true,
        top,
        blockId,
        blocksElement,
        indexBlock,
      }));
    }

    setPropertyAiForm((preState) => ({ ...preState, isShow: false, top: 0 }));
  };

  const handleChangeEditorJS = async (api: any) => {
    const currentBlockIndex = api.blocks.getCurrentBlockIndex();
    const { blocks: blocksSaved } = await editorCore?.current?.save();
    console.log("blocksSaved", blocksSaved);

    const textChanged = get(blocksSaved, `${currentBlockIndex}.data.text`);
    const blockId = get(blocksSaved, `${currentBlockIndex}.id`);
    setBlocks(keyBy(blocksSaved, "id") as any);
    openAIForm(textChanged, blockId, currentBlockIndex, api.blocks);
  };

  const handleInsertAnswer = async (answer: any, blockId: string) => {
    const { content } = answer;
    const blockById = get(blocks, `${blockId}`);

    const textModified = get(blockById, "data.text").replaceAll("/ai", content);
    const blocksElement = get(propertyAIForm, `blocksElement`) ?? ({} as any);
    // const indexBlock = get(propertyAIForm, `indexBlock`) || 0;
    blocksElement?.update(blockId, {
      ...blockById.data,
      text: textModified,
      noteIds: [...Object.values(idsSelected)],
    });

    // blocksElement?.insert(
    //   "paragraph",
    //   {
    //     text: content,
    //     noteIds: [...Object.values(idsSelected)],
    //     index: 1,
    //   },
    //   undefined,
    //   indexBlock + 1,
    //   true
    // );

    setBlocks({
      ...blocks,
      [`${blockId}`]: {
        ...blockById,
        data: {
          ...blockById.data,
          text: textModified,
          noteIds: [...Object.values(idsSelected)],
        },
      },
    });
    setPropertyAiForm((preState) => ({ ...preState, isShow: false, top: 0 }));
    dispatch({ type: "REMOVE_NOTE_ID_SELECTED" });
  };

  console.log("blocks", blocks);

  return (
    <section className="min-h-screen">
      <ReactEditorJS
        holder="custom"
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleChangeEditorJS}
        defaultBlock="paragraph-custom"
        data={{ blocks: Object.values(blocks) }}
      >
        <div id="custom" className="relative px-3 min-h-[100px]">
          {propertyAIForm.isShow ? (
            <AIForm
              top={propertyAIForm.top}
              blockId={propertyAIForm.blockId}
              notes={notes}
              idsSelected={idsSelected}
              onCloseForm={() =>
                setPropertyAiForm((preState) => ({
                  ...preState,
                  isShow: false,
                  top: 0,
                }))
              }
              onInsertAnswer={handleInsertAnswer}
            />
          ) : null}
        </div>
      </ReactEditorJS>
      <NoteSelected
        notes={notes}
        idsSelected={idsSelected}
        isShowAIForm={propertyAIForm.isShow}
      />
    </section>
  );
}

export default Editor;
