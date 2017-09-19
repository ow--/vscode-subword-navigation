import { Position, TextDocument } from 'vscode';

const whitespace = /\s/;
const separators = /[\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]/;

export function nextBoundaryLeft(document: TextDocument, position: Position) {
    // find previous word boundary
    const cur = document.lineAt(position);
    if (position.isAfter(cur.range.start)) {
        for (let i = position.translate(0, -1); i.isAfterOrEqual(cur.range.start); i = i.translate(0, -1)) {
            if (i.isEqual(cur.range.start)) return i;
            if (isLeftBoundary(cur.text, i)) return i;
        }
    }

    // found no boundary before line start
    if (position.line === 0) return position;
    const prev = document.lineAt(position.line - 1);
    for (let i = prev.range.end; i.isAfter(prev.range.start); i = i.translate(0, -1)) {
        if (!whitespace.test(prev.text[i.character - 1])) return i;
    }
    return prev.range.start;
}

export function nextBoundaryRight(document: TextDocument, position: Position) {
    // find next word boundary
    const cur = document.lineAt(position);
    for (let i = position.translate(0, 1); i.isBeforeOrEqual(cur.range.end); i = i.translate(0, 1)) {
        if (i.isEqual(cur.range.end)) return i;
        if (isRightBoundary(cur.text, i)) return i;
    }

    // found no boundary before line end
    if (position.line + 1 >= document.lineCount) return cur.range.end;
    const next = document.lineAt(position.line + 1);
    return next.range.start.translate(0, next.firstNonWhitespaceCharacterIndex);
}

function isRightBoundary(text: string, position: Position) {
    const prev = char(text[position.character - 1]);
    const cur = char(text[position.character]);
    const next = char(text[position.character + 1]);

    // Return true iff cur is at the end of a word
    return !prev.whitespace && (
        cur.whitespace ||
        !prev.separator && cur.separator ||
        !prev.underscore && cur.underscore ||
        prev.lower && cur.upper
    )
}

function isLeftBoundary(text: string, position: Position) {
    const prev = char(text[position.character - 1]);
    const cur = char(text[position.character]);
    const next = char(text[position.character + 1]);

    // Return true iff we are at the start of a word
    return !cur.whitespace && (
        prev.whitespace ||
        prev.separator && !cur.separator ||
        prev.underscore && !cur.underscore ||
        prev.lower && cur.upper
    )
}

function char(c: string) {
    const cl = { none: false, whitespace: false, upper: false, lower: false, numeric: false, underscore: false, separator: "" };

    if (!c) cl.none = true;
    else if (c === '_') cl.underscore = true;
    else if (c === ' ') cl.whitespace = true;
    else if (isSeparator(c)) cl.separator = c;
    else if (isDigit(c)) cl.numeric = true;
    else if (isUpper(c)) cl.upper = true;
    else if (isLower(c)) cl.lower = true;

    return cl;
}

function isUpper(c: string) {
	return c === c.toUpperCase() && c !== c.toLowerCase();
}

function isLower(c: string) {
	return c === c.toLowerCase() && c !== c.toUpperCase();
}

function isDigit(c: string) {
    const d = c.charCodeAt(0);
    return d >= 0x30 && d <= 0x39;
}

function isSeparator(c: string) {
    return separators.test(c);
}
