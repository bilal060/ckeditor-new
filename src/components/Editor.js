import React, { useEffect } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import '../../node_modules/ckeditor5-custom-build/build/translations/ar';

const CustomEditor = () => {

    let [searchParams, setSearchParams] = useSearchParams();

    const saveData = data => {
        const doc_id = +searchParams.get('doc_id');
        const doc_type = searchParams.get('doc_type');
        const lang = searchParams.get('lang');
        console.log({ doc_id, doc_type, lang });
        console.log("Autosave", data);
        const apiData = {
            id: doc_id,
            document_type: doc_type,
            content: data
        };
        // axios.post('http://ms-kuwait.com/tothiq-api/save-document', apiData, {
        //     withCredentials: true,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => {
        //         console.log("Response", response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    };

    useEffect(() => {
        setSearchParams({ doc_id: '1', doc_type: 'contract', lang: 'en' });
    }, []);

    // useEffect(() => {
    //     const doc_id = searchParams.get('doc_id')
    //     axios.get(`https://versionreview.com/tothiq-api/get-document/${doc_id}`)
    // }, [searchParams]);

    const editorConfiguration = {
        language: {
            ui: searchParams.get('lang') || 'en',
            content: searchParams.get('lang') || 'en'
        },
        exportPdf: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
        },
        exportWord: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
        },
        autosave: {
            save(editor) {
                return saveData(editor.getData());
            }
        },
        collaboration: {
            channelId: process.env.REACT_APP_EDITOR_CHANNEL_ID
        },
        sidebar: {
            container: document.querySelector('#sidebar')
        },
        presenceList: {
            container: document.querySelector('#presence-list-container')
        },
        wordCount: {
            onUpdate: stats => {
                console.log(`Characters: ${stats.characters}\nWords: ${stats.words}`);
            }
        },
        revisionHistory: {
            editorContainer: document.querySelector('#editor-container'),
            viewerContainer: document.querySelector('#revision-viewer-container'),
            viewerEditorElement: document.querySelector('#revision-viewer-editor'),
            viewerSidebarContainer: document.querySelector('#revision-viewer-sidebar')
        },
        trackChanges: {
            disableComments: true,
            trackFormatChanges: 'never',
            mergeNestedSuggestions: true
        },
        cloudServices: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
            webSocketUrl: process.env.REACT_APP_EDITOR_SOCKET_URL,
            uploadUrl: process.env.REACT_APP_EDITOR_UPLOAD_URL
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
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event) => {
                    console.log(event);
                }}
            />
            <div id="presence-list-container"></div>
            <div id="editor-container">
                <div className="container">
                    <div id="editor"><p>Let's edit this together!</p></div>
                    <div className="sidebar" id="sidebar"></div>
                </div>
            </div>

            <div id="revision-viewer-container">
                <div className="container">
                    <div id="revision-viewer-editor"></div>
                    <div className="sidebar" id="revision-viewer-sidebar"></div>
                </div>
            </div>
        </div>
    )
}

export default CustomEditor;