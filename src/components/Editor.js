import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CustomEditor = () => {

    const [ourEditor, setOurEditor] = useState(null);

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

    return (
        <div className="container">
            <h2>React CKEditor</h2>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                    
                    const editableElement = editor.ui.getEditableElement();
                    const parentElement = editableElement && editableElement.parentElement;
                
                    if (parentElement) {
                        parentElement.insertBefore(editor.ui.view.toolbar.element, editableElement);
                    }
                
                    setOurEditor(editor);
                }}
                onError={(error, { willEditorRestart }) => {
                    if (willEditorRestart) {
                        ourEditor.ui.view.toolbar.element.remove();
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
        </div>
    )
}

export default CustomEditor;