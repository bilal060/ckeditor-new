import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CustomEditor = () => {

    console.log(process.env.REACT_APP_EDITOR_UPLOAD_URL, "configggggggggggggggggggggg");

    const editorConfiguration = {
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
        revisionHistory: {
            editorContainer: document.querySelector('#editor-container'),
            viewerContainer: document.querySelector('#revision-viewer-container'),
            viewerEditorElement: document.querySelector('#revision-viewer-editor'),
            viewerSidebarContainer: document.querySelector('#revision-viewer-sidebar'),
          },
          
        licenseKey: process.env.REACT_APP_EDITOR_LICENSE,
    };
    console.log("🚀 ~ file: Editor.js:25 ~ CustomEditor ~ editorConfiguration:", editorConfiguration)

    return (
        <div className="container">
            <h2>React CKEditor</h2>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={
                    ClassicEditor
                        .create(document.querySelector('#editor'))
                        .then(editor => {
                            console.log('Editor was initialized', editor);
                        })
                        .catch(err => {
                            console.error(err.stack);
                        })
                }
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
        </div>
    )
}

export default CustomEditor;