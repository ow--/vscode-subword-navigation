import { commands } from 'vscode';
import * as subwordNavigation from './commands';

export function activate() {
    commands.registerTextEditorCommand(
        'subwordNavigation.cursorSubwordLeft',
        subwordNavigation.cursorSubwordLeft);

    commands.registerTextEditorCommand(
        'subwordNavigation.cursorSubwordRight',
        subwordNavigation.cursorSubwordRight);

    commands.registerTextEditorCommand(
        'subwordNavigation.cursorSubwordLeftSelect',
        subwordNavigation.cursorSubwordLeftSelect);

    commands.registerTextEditorCommand(
        'subwordNavigation.cursorSubwordRightSelect',
        subwordNavigation.cursorSubwordRightSelect);

    commands.registerTextEditorCommand(
        'subwordNavigation.deleteSubwordLeft',
        subwordNavigation.deleteSubwordLeft);

    commands.registerTextEditorCommand(
        'subwordNavigation.deleteSubwordRight',
        subwordNavigation.deleteSubwordRight);
}
