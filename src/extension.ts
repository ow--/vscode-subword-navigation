import { commands, window } from 'vscode';
import * as subwordNavigation from './commands';

export function activate() {
    commands.registerCommand(
        'subwordNavigation.cursorSubwordLeft',
        () => subwordNavigation.cursorSubwordLeft(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.cursorSubwordRight',
        () => subwordNavigation.cursorSubwordRight(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.cursorSubwordLeftSelect',
        () => subwordNavigation.cursorSubwordLeftSelect(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.cursorSubwordRightSelect',
        () => subwordNavigation.cursorSubwordRightSelect(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.deleteSubwordLeft',
        () => subwordNavigation.deleteSubwordLeft(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.deleteSubwordRight',
        () => subwordNavigation.deleteSubwordRight(window.activeTextEditor));

    commands.registerCommand(
        'subwordNavigation.expandSubwordSelection',
        () => subwordNavigation.expandSubwordSelection(window.activeTextEditor));
}
