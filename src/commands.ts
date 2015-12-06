import { Selection, TextEditor, TextEditorEdit } from 'vscode';
import { nextBoundaryLeft, nextBoundaryRight } from './boundaries';

export function cursorSubwordLeft(editor: TextEditor) {
    const pos = nextBoundaryLeft(editor.document, editor.selection.active);
    editor.selection = new Selection(pos, pos);
}

export function cursorSubwordRight(editor: TextEditor) {
    const pos = nextBoundaryRight(editor.document, editor.selection.active);
    editor.selection = new Selection(pos, pos);
}

export function cursorSubwordLeftSelect(editor: TextEditor) {
    const pos = nextBoundaryLeft(editor.document, editor.selection.active);
    editor.selection = new Selection(editor.selection.anchor, pos);
}

export function cursorSubwordRightSelect(editor: TextEditor) {
    const pos = nextBoundaryRight(editor.document, editor.selection.active);
    editor.selection = new Selection(editor.selection.anchor, pos);
}

export function deleteSubwordLeft(editor: TextEditor, edit: TextEditorEdit) {
    if (!editor.selection.isEmpty) {
        edit.delete(editor.selection);
        return;
    }
    const pos = nextBoundaryLeft(editor.document, editor.selection.active);
    edit.delete(editor.selection.with(pos));
}

export function deleteSubwordRight(editor: TextEditor, edit: TextEditorEdit) {
    if (!editor.selection.isEmpty) {
        edit.delete(editor.selection);
        return;
    }
    const pos = nextBoundaryRight(editor.document, editor.selection.active);
    edit.delete(editor.selection.with(pos));
}
