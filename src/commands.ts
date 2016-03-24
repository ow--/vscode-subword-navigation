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

function cursorSubword(editor: TextEditor, next: BoundaryFunc, sel: SelectionFunc) {
    editor.selections = editor.selections.map(s => 
        sel(s, next(editor.document, s.active)));
    reveal(editor);
}

function deleteSubword(editor: TextEditor, next: BoundaryFunc) {
    let edit = Promise.resolve(true);
    editor.selections.forEach(s => edit = edit.then(() => 
        editor.edit(e => e.delete(s.isEmpty ? s.with(next(editor.document, s.active)) : s))));
    edit.then(() => reveal(editor));
}

function reveal(editor: TextEditor) {
    if (editor.selections.length === 1) {
        editor.revealRange(editor.selection, TextEditorRevealType.InCenterIfOutsideViewport);
    }
}

function move(selection: Selection, boundary: Position) {
    return new Selection(boundary, boundary);
}

function select(selection: Selection, boundary: Position) {
    return new Selection(selection.anchor, boundary);
}

type BoundaryFunc = (doc: TextDocument, pos: Position) => Position;
type SelectionFunc = (selection: Selection, boundary: Position) => Selection;
