import React, { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import '../../node_modules/ckeditor5-custom-build/build/translations/ar';
import '../assets/css/style.css';

const CustomEditor = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [revisionHistoryConfig, setRevisionHistoryConfig] = useState({});
    const [isReady, setIsReady] = useState(false);
    const saveData = data => {
        const doc_id = +searchParams.get('doc_id');
        const doc_type = searchParams.get('doc_type');
        const lang = searchParams.get('lang');
        console.log({ doc_id, doc_type, lang });
        console.log("Autosave", data);
        const apiData = {
            id: doc_id || 1,
            document_type: doc_type || 'contract',
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

    // useEffect(() => {
    //     setSearchParams({ doc_id: '1', doc_type: 'contract' });
    // }, []);

    // useEffect(() => {
    //     const doc_id = searchParams.get('doc_id')
    //     axios.get(`https://versionreview.com/tothiq-api/get-document/${doc_id}`)
    // }, [searchParams]);

    useEffect(() => {
        const editorContainer = document.querySelector('#editor-container');
        const viewerContainer = document.querySelector('#revision-viewer-container');
        const viewerEditorElement = document.querySelector('#revision-viewer-editor');
        const viewerSidebarContainer = document.querySelector('#revision-viewer-sidebar');
            setRevisionHistoryConfig
                ({
                    editorContainer,
                    viewerContainer,
                    viewerEditorElement,
                    viewerSidebarContainer
                });
    }, [isReady]);


    const editorConfiguration = {
        language: {
            ui: searchParams.get('lang') || 'en',
            content: searchParams.get('lang') || 'en'
        },
        exportPdf: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
            converterOptions: {
                format: 'A4',
                margin_top: '20mm',
                margin_bottom: '20mm',
                margin_right: '12mm',
                margin_left: '12mm',
                page_orientation: 'portrait'
            }
        },
        exportWord: {
            tokenUrl: process.env.REACT_APP_EDITOR_TOKEN_URL,
            converterOptions: {
                format: 'A4',
                margin_top: '20mm',
                margin_bottom: '20mm',
                margin_right: '12mm',
                margin_left: '12mm'
            }
        },
        autosave: {
            save(editor) {
                return saveData(editor.getData());
            }
        },
        collaboration: {
            channelId: searchParams.get('channel') || 'document-id-10'
        },
        sidebar: {
            container: document.querySelector('#sidebar')
        },
        presenceList: {
            container: document.querySelector('#presence-list-container'),
            collapseAt: 3,
            onClick: (user, element) => console.log(user, element)
        },
        wordCount: {
            onUpdate: stats => {
                console.log(`Characters: ${stats.characters}\nWords: ${stats.words}`);
            }
        },
        wproofreader: {
            serviceId: process.env.REACT_APP_EDITOR_SERVICE_ID,
            srcUrl: 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js'
        },
        pagination: {
            pageWidth: '21cm',
            pageHeight: '29.7cm',
            pageMargins: {
                top: '20mm',
                bottom: '20mm',
                left: '12mm',
                right: '12mm'
            }
        },
        revisionHistory: revisionHistoryConfig,
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
                config={{
                    ...editorConfiguration,
                    revisionHistory: revisionHistoryConfig,
                }}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={editor => {
                    setIsReady(true);
                    console.log('Editor is ready to use!', editor);
                    if (searchParams.get('readOnly')) {
                        editor.enableReadOnlyMode('my-feature-id');
                    }
                    else {
                        editor.disableReadOnlyMode('my-feature-id');
                    }
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