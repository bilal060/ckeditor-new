/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import {
	Bold,
	Italic,
	Strikethrough,
	Subscript,
	Underline
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Comments } from '@ckeditor/ckeditor5-comments';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import { ExportWord } from '@ckeditor/ckeditor5-export-word';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { FormatPainter } from '@ckeditor/ckeditor5-format-painter';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Image, ImageUpload } from '@ckeditor/ckeditor5-image';
import { ImportWord } from '@ckeditor/ckeditor5-import-word';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { DocumentList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Pagination } from '@ckeditor/ckeditor5-pagination';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import {
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeRevisionHistory,
	RealTimeCollaborativeTrackChanges
} from '@ckeditor/ckeditor5-real-time-collaboration';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { StandardEditingMode } from '@ckeditor/ckeditor5-restricted-editing';
import { RevisionHistory } from '@ckeditor/ckeditor5-revision-history';
import {
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TrackChanges } from '@ckeditor/ckeditor5-track-changes';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { WordCount } from '@ckeditor/ckeditor5-word-count';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		Autoformat,
		Autosave,
		BlockQuote,
		Bold,
		CloudServices,
		Comments,
		DocumentList,
		EasyImage,
		Essentials,
		ExportPdf,
		ExportWord,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		FormatPainter,
		Heading,
		Highlight,
		HorizontalLine,
		Image,
		ImageUpload,
		ImportWord,
		Indent,
		Italic,
		Link,
		MediaEmbed,
		PageBreak,
		Pagination,
		Paragraph,
		PasteFromOffice,
		RealTimeCollaborativeComments,
		RealTimeCollaborativeEditing,
		RealTimeCollaborativeRevisionHistory,
		RealTimeCollaborativeTrackChanges,
		RemoveFormat,
		RevisionHistory,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		StandardEditingMode,
		Strikethrough,
		Subscript,
		Table,
		TableToolbar,
		TextTransformation,
		TrackChanges,
		Underline,
		Undo,
		WordCount
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'undo',
				'redo',
				'fontBackgroundColor',
				'fontColor',
				'fontFamily',
				'fontSize',
				'formatPainter',
				'highlight',
				'horizontalLine',
				'alignment',
				'exportPdf',
				'exportWord',
				'importWord',
				'pageBreak',
				'previousPage',
				'nextPage',
				'pageNavigation',
				'comment',
				'commentsArchive',
				'revisionHistory',
				'trackChanges',
				'removeFormat',
				'specialCharacters',
				'restrictedEditingException',
				'subscript'
			]
		},
		language: 'en',
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			],
			tableToolbar: [
				'comment',
				'comment'
			]
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
