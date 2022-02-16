# terminal-ui

> A simple framework for creating terminal apps with keyboard control.

## Install
```
$ npm i dmkbn@terminal-ui
```

## Usage
```js
import terminal from 'dmkbn@terminal-ui'

function examplePage() {
  terminal.command('e', 'Exit', () => {
    terminal.exit()
})
  terminal.render(() => {
    return 'Example Page'
  })
}

terminal.initPages([examplePage])
terminal.run()
```

## Methods

### initPages
```js
terminal.initPages([example, subpage])
```
Registers all pages of the terminal.

#### Parameters
* `pageInitiators` - Array of page initiator functions

### run
```js
terminal.run('mainPage')
```
Starts the terminal app.

#### Parameters
* `startPage` - String name of the page that will be displayed after startup. Default: First page of array provided at `initPages()`.

### render
```js
terminal.render(() => {
  return 'Hello World!'
})
```
Sets the render function.

#### Parameters
* `fn` - Function that returns a string

### command
```js
terminal.command('e', 'Edit Value', () => {
  value = 5
})
```
Adds a new command to the command collection.

#### Parameters
* `command` - Hotkey that triggers the command (a single char)
* `name` - Name of the command
* `fn` - The function to execute, after the key was pressed. This can also be an async function.

### goTo
```js
terminal.goTo('myPage')
```
Switches to the given page.

#### Parameters
* `page` - Name of the page

### menu
```js
terminal.menu(['o', 'e', 'x'])
```
Specifies the appearance of the menu bar.

#### Parameters
* `commands` - An array of commands to display in the mebu bar. They will appear in the same order as they are specified. Setting this to false disables the menu bar.

Disable the menu bar:
```js
terminal.menu(false)
```

### exit
```js
terminal.exit()
```
Closes the terminal.
