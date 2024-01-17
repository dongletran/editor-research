/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useRef } from "react";
import { get, keyBy, round } from "lodash";

import ParagraphCustom from "../../paragraph-custom";

import "./Editor.scss";

import AIForm from "../../ai-form";

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

function Editor() {
  const editorCore = useRef<any | null>(null);

  const [propertyAIForm, setPropertyAiForm] = useState(
    INITIAL_PROPERTY_AI_FORM
  );

  const [blocks, setBlocks] = useState({});

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const openAIForm = (string: string, blockId: string, blocksElement: any) => {
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
      }));
    }

    setPropertyAiForm((preState) => ({ ...preState, isShow: false, top: 0 }));
  };

  const handleChangeEditorJS = async (api: any) => {
    const currentBlockIndex = api.blocks.getCurrentBlockIndex();
    const { blocks } = await editorCore?.current?.save();
    const textChanged = get(blocks, `${currentBlockIndex}.data.text`);
    const blockId = get(blocks, `${currentBlockIndex}.id`);
    openAIForm(textChanged, blockId, api.blocks);
    setBlocks(keyBy(blocks, "id"));
  };

  const handleInsertAnswer = (answer: any, blockId: string) => {
    const { content } = answer;
    const blockById = get(blocks, `${blockId}`);

    const textModified = get(blockById, "data.text").replaceAll(
      "/ai",
      `<span class="text-primary">${content}</span>`
    );
    const blocksElement = get(propertyAIForm, `blocksElement`) ?? ({} as any);
    blocksElement?.update(blockId, {
      ...blockById.data,
      text: textModified,
    });

    blocksElement.insert("paragraph", { text: "12321" }, 1, true);

    setBlocks({
      ...blocks,
      [`${blockId}`]: {
        ...blockById,
        data: {
          ...blockById.data,
          text: textModified,
        },
      },
    });

    setPropertyAiForm(INITIAL_PROPERTY_AI_FORM);
  };

  console.log("blocks", blocks);

  return (
    <>
      <ReactEditorJS
        holder="custom"
        onInitialize={handleInitialize}
        // tools={EDITOR_JS_TOOLS}
        onChange={handleChangeEditorJS}
        defaultBlock="paragraph"
        data={{ blocks: Object.values(blocks) }}
      >
        <div id="custom" className="relative px-3 min-h-[200px]">
          {propertyAIForm.isShow ? (
            <AIForm
              top={propertyAIForm.top}
              blockId={propertyAIForm.blockId}
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
    </>
  );
}

export default Editor;
