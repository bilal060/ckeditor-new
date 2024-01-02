import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
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
        licenseKey: process.env.REACT_APP_EDITOR_LICENSE,
    };

    return (
        <div className="container">
            <h2>React CKEditor</h2>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={
                    Editor
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