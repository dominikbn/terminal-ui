import terminal from './terminal.js'
import colors from 'ansi-colors'


function example() {
  const colorList = [colors.cyan, colors.magenta, colors.yellow]

  let text = 'Press [c] to change color!'
  let iColor = 0

  terminal.command('c', 'Change Color', () => {
    if (iColor < 2) iColor++
    else iColor = 0
  })

  terminal.command('s', 'Subpage', () => {
    terminal.goTo('subpage')
  })

  terminal.command('x', 'Exit', () => {
    terminal.exit()
  })

  terminal.render(() => {
    return `Example page.\n${colorList[iColor](text)}`
  })
}


function subpage() {
  terminal.command('b', 'Back to menu', () => {
    terminal.goTo('example')
  })

  terminal.menu(false)

  terminal.render(() => {
    return `This is a subpage.\nMenu bar is disabled.\n\n[b] Back to example page`
  })
}


terminal.initPages([example, subpage])
terminal.run()
