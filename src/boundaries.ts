import { Position, TextDocument } from 'vscode';

const whitespace = /\s/;
const separators = /[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]/;

enum Direction {
    Left,
    Right
}

export function nextBoundaryLeft(document: TextDocument, position: Position) {
    // find previous word boundary
    const cur = document.lineAt(position);
    if (position.isAfter(cur.range.start)) {
        for (let i = position.translate(0, -1); i.isAfterOrEqual(cur.range.start); i = i.translate(0, -1)) {
            if (i.isEqual(cur.range.start)) return i;
            if (isBoundary(cur.text, i, Direction.Left)) return i;
        }
    }

    // found no boundary before line start
    if (position.line === 0) return position;
    const prev = document.lineAt(position.line - 1);
    for (let i = prev.range.end; i.isAfter(prev.range.start); i = i.translate(0, -1)) {
        if (!isSpace(prev.text[i.character - 1])) return i;
    }
    return prev.range.start;
}

export function nextBoundaryRight(document: TextDocument, position: Position) {
    // find next word boundary
    const cur = document.lineAt(position);
    for (let i = position.translate(0, 1); i.isBeforeOrEqual(cur.range.end); i = i.translate(0, 1)) {
        if (i.isEqual(cur.range.end)) return i;
        if (isBoundary(cur.text, i, Direction.Right)) return i;
    }

    // found no boundary before line end
    if (position.line + 1 >= document.lineCount) return cur.range.end;
    const next = document.lineAt(position.line + 1);
    return next.range.start.translate(0, next.firstNonWhitespaceCharacterIndex);
}

function isBoundary(text: string, position: Position, direction: Direction) {
    const prev2 = char(text[position.character - 2]);
    const prev = char(text[position.character - 1]);
    const cur = char(text[position.character]);
    const next = char(text[position.character + 1]);

    /// VSCode default behavior, but with own separators
    if (direction == Direction.Right) {
        if (cur.space && !prev.space) return true;
        if (cur.separator && (!prev.separator && !prev.space)) return true;
        if (!cur.separator && prev2.separator && prev.separator) return true;
    } else {
        if (prev.space && !cur.space) return true;
        if (prev.separator && (!cur.separator && !cur.space)) return true;
        if (cur.separator && next.separator && !prev.separator) return true;
    }

    /// CamelHumps
    if (cur.numeric && !prev.numeric) return true;
    if (prev.numeric && !cur.numeric) return true;
    if (cur.upper && prev.lower) return true;
    if (cur.upper && next.lower) return true;

    return false;
}

function char(c: string) {
    const cl = { none: false, space: false, upper: false, lower: false, numeric: false, separator: "" };

    if (!c) cl.none = true;
    else if (isSpace(c)) cl.space = true;
    else if (isSeparator(c)) cl.separator = c;
    else if (isDigit(c)) cl.numeric = true;
    else if (isUpper(c)) cl.upper = true;
    else if (isLower(c)) cl.lower = true;

    return cl;
}

function isSpace(c: string) {
    return whitespace.test(c);
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
