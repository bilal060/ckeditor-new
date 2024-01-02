/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Comments } from '@ckeditor/ckeditor5-comments';
import { Plugin, type EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import { ExportWord } from '@ckeditor/ckeditor5-export-word';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import {
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { ImportWord } from '@ckeditor/ckeditor5-import-word';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { DocumentList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { RevisionHistory } from '@ckeditor/ckeditor5-revision-history';
import type { RevisionData } from '@ckeditor/ckeditor5-revision-history/src/revision';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';

export class RevisionHistoryAdapter extends Plugin {
	public static get requires(): Array<string> {
		return [ 'RevisionHistory' ];
	}

	public init(): void {
		const revisionHistory = this.editor.plugins.get( 'RevisionHistory' ) as RevisionHistory;
		const revisions: Array<RevisionData> = [];

		revisionHistory.adapter = {
			getRevision: async ( { revisionId } ) => {
				return revisions.find( data => data.id == revisionId ) || {};
			},
			updateRevisions: async revisionsData => {
				return revisions.splice( 0, revisions.length, ...revisionsData );
			}
		};
	}
}

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Autoformat,
		BlockQuote,
		Bold,
		CloudServices,
		Comments,
		DocumentList,
		Essentials,
		ExportPdf,
		ExportWord,
		Heading,
		HtmlEmbed,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		ImportWord,
		Indent,
		Italic,
		Link,
		MediaEmbed,
		Paragraph,
		RevisionHistory,
		RevisionHistoryAdapter,
		Table,
		TableToolbar
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo',
				'comment',
				'commentsArchive',
				'exportPdf',
				'exportWord',
				'importWord',
				'revisionHistory',
				'htmlEmbed'
			]
		},
		language: 'en',
		image: {
			toolbar: [
				'comment',
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			],
			tableToolbar: [
				'comment'
			]
		},
		comments: {
			editorConfig: {
				extraPlugins: [
					Autoformat,
					Bold,
					Italic
				]
			}
		}
	};
}

export default Editor;
