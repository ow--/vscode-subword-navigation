import { Selection, TextDocument, TextEditor, TextEditorEdit, TextEditorRevealType, Position } from 'vscode';
import { nextBoundaryLeft as left, nextBoundaryRight as right } from './boundaries';

export function cursorSubwordLeft(editor: TextEditor) {
    cursorSubword(editor, left, move);
}

export function cursorSubwordRight(editor: TextEditor) {
    cursorSubword(editor, right, move);
}

export function cursorSubwordLeftSelect(editor: TextEditor) {
    cursorSubword(editor, left, select);
}

export function cursorSubwordRightSelect(editor: TextEditor) {
    cursorSubword(editor, right, select);
}

export function deleteSubwordLeft(editor: TextEditor) {
    deleteSubword(editor, left);
}

export function deleteSubwordRight(editor: TextEditor) {
    deleteSubword(editor, right);
}

type BoundaryFunc = (doc: TextDocument, pos: Position) => Position;
type SelectionFunc = (selection: Selection, boundary: Position) => Selection;

function move(selection: Selection, boundary: Position) {
    return new Selection(boundary, boundary);
}

function select(selection: Selection, boundary: Position) {
    return new Selection(selection.anchor, boundary);
}

function cursorSubword(editor: TextEditor, nextBoundary: BoundaryFunc, createSelection: SelectionFunc) {
    editor.selections = editor.selections.map(selection => {
        const pos = nextBoundary(editor.document, selection.active);
        return createSelection(selection, pos);
    });
    reveal(editor);
}

function deleteSubword(editor: TextEditor, nextBoundary: BoundaryFunc) {
    let edit = new Promise<boolean>(resolve => resolve());
    editor.selections.forEach(selection => {
        const s = selection.isEmpty
            ? selection.with(nextBoundary(editor.document, selection.active))
            : selection;
        edit = edit.then(() => editor.edit(e => e.delete(s)));
    });
    edit.then(() => reveal(editor));
}

function reveal(editor: TextEditor) {
    if (editor.selections.length === 1) {
        editor.revealRange(editor.selection, TextEditorRevealType.InCenterIfOutsideViewport);
    }
}
