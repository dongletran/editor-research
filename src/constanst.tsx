import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import EditorJS from "@editorjs/editorjs"
import { SimpleImg } from "./simple-note/simpleImg"

const Test = new EditorJS({
    holder: 'test',
    autoFocus: true,
    tools: {
        image: SimpleImg
    },
})
Test.isReady
    .then(() => {
        console.log('Editor.js is ready to work!')
        /** Do anything you need after editor initialization */
    })
    .catch((reason: any) => {
        console.log(`Editor.js initialization failed because of ${reason}`)
    });

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    simpleImg: SimpleImg
}