# Subword Navigation for Visual Studio Code
Subword Navigation is a Visual Studio Code extension that allows developers to navigate through code using subwords. With Subword Navigation, developers can save time and avoid the hassle of reaching for the mouse or selecting parts of words one character at a time.

## Features
Subword Navigation offers the following features:
- Same behavior as VSCode's but with subword navigation.
- Override VSCode's default word navigation.
- Navigate through camelCase, CamelHumps, snake_case, and kebab-case words.
- Works with multiple cursors for efficient editing.
- Customizable keyboard shortcuts.

## Usage
Subword Navigation is activated by default once you have installed and enabled the extension in Visual Studio Code.

To customize the keyboard shortcuts, open the keyboard shortcuts interface and search for `subword`. From there, you can assign your preferred shortcuts to the commands.

## Mapping
| Command | Overrides | Keybinding |
| --- | --- | --- |
| `subwordNavigation.cursorWordLeft` | `cursorWordLeft` | <kbd>Ctrl</kbd> + <kbd>Left</kbd> |
| `subwordNavigation.cursorWordLeftSelect` | `cursorWordLeftSelect` | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Left</kbd> |
| `subwordNavigation.cursorWordRight` | `cursorWordRight` | <kbd>Ctrl</kbd> + <kbd>Right</kbd> |
| `subwordNavigation.cursorWordRightSelect` | `cursorWordRightSelect` | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Right</kbd> |
| `subwordNavigation.deleteWordLeft` | `deleteWordLeft` | <kbd>Ctrl</kbd> + <kbd>Backspace</kbd> |
| `subwordNavigation.deleteWordRight` | `deleteWordRight` | <kbd>Ctrl</kbd> + <kbd>Delete</kbd> |

## License
Subword Navigation is released under the [MIT License](https://opensource.org/licenses/MIT).
