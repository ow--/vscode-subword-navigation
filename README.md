# Subword Navigation for Visual Studio Code
The missing code navigation feature causing developers all over the world such hardship and time loss by having to reach for that pesky mouse or selecting parts of words one single character at the time. No warranty.

## Usage
Open your key bindings and add the commands that you crave. Look up `cursorWordLeft` in the default bindings for inspiration.

## Available Commands
```
subwordNavigation.cursorSubwordLeft
subwordNavigation.cursorSubwordRight
subwordNavigation.cursorSubwordLeftSelect
subwordNavigation.cursorSubwordRightSelect
subwordNavigation.deleteSubwordLeft
subwordNavigation.deleteSubwordRight
```

## Quickstart example (keybindings.json)
```js
// Place your key bindings in this file to overwrite the defaults.
// Note ctrl+left and ctrl+right are reserved for Mission Control on macOS, so
// this will require an alternative binding.
[
    {
        "key": "ctrl+left",
        "command": "subwordNavigation.cursorSubwordLeft",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+right",
        "command": "subwordNavigation.cursorSubwordRight",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+shift+left",
        "command": "subwordNavigation.cursorSubwordLeftSelect",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+shift+right",
        "command": "subwordNavigation.cursorSubwordRightSelect",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+backspace",
        "command": "subwordNavigation.deleteSubwordLeft",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+delete",
        "command": "subwordNavigation.deleteSubwordRight",
        "when": "editorTextFocus"
    }
]
```

## OS X equivalent example (keybindings.json)
```js
// Place your key bindings in this file to overwrite the defaults
[
    {
        "key": "alt+left",
        "command": "subwordNavigation.cursorSubwordLeft",
        "when": "editorTextFocus"
    },
    {
        "key": "alt+right",
        "command": "subwordNavigation.cursorSubwordRight",
        "when": "editorTextFocus"
    },
    {
        "key": "shift+alt+right",
        "command": "subwordNavigation.cursorSubwordRightSelect"
    },
    {
        "key": "shift+alt+left",
        "command": "subwordNavigation.cursorSubwordLeftSelect"
    },
    {
        "key": "alt+backspace",
        "command": "subwordNavigation.deleteSubwordLeft",
        "when": "editorTextFocus"
    },
    {
        "key": "alt+delete",
        "command": "subwordNavigation.deleteSubwordRight",
        "when": "editorTextFocus"
    }
]
```
