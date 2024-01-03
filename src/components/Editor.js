import React, { Component } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
    toolbar: {
        items: [
            'aiCommands', 'aiAssistant', '|',
            'uploadImage', '|',
            'exportPDF', 'exportWord', '|',
            'comment', 'trackChanges', 'revisionHistory', '|',
            'findAndReplace', 'selectAll', 'formatPainter', '|',
            'undo', 'redo',
            '-',
            'bold', 'italic', 'strikethrough', 'underline', 'removeFormat', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'outdent', 'indent', '|',
            'alignment', '|',
            '-',
            'heading', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
            'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', 'tableOfContents', 'insertTemplate', '|',
            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
            // Intentionally skipped buttons to keep the toolbar smaller, feel free to enable them:
            // 'code', 'subscript', 'superscript', 'textPartLanguage', '|',
            // ** To use source editing remember to disable real-time collaboration plugins **
            // 'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
    },
    collaboration: {
        channelId: process.env.REACT_APP_EDITOR_CHANNEL_ID,
        providerFactory: (cfg) => {
            console.log("Token URL", cfg.tokenUrl);
            return new WebSocket(process.env.REACT_APP_EDITOR_TOKEN_URL);
        },
        providerConfig: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
            documentId: process.env.REACT_APP_EDITOR_DOC_ID,
            webSocketUrl: process.env.REACT_APP_EDITOR_SOCKET_URL,
            uploadUrl: process.env.REACT_APP_EDITOR_UPLOAD_URL,
        },
    },
    // revisionHistory: {
    //     editorContainer: document.querySelector('#editor-container'),
    //     viewerContainer: document.querySelector('#revision-viewer-container'),
    //     viewerEditorElement: document.querySelector('#revision-viewer-editor'),
    //     viewerSidebarContainer: document.querySelector('#revision-viewer-sidebar'),
    // },

    licenseKey: process.env.REACT_APP_EDITOR_LICENSE,
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor&nbsp;5 from online builder in React</h2>
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event) => {
                        console.log(event);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
        );
    }
}

export default App;
