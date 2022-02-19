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

  terminal.command('a', 'Aquarium', () => {
    terminal.goTo('aquarium')
  })

  terminal.command('x', 'Exit', () => {
    terminal.exit()
  })

  terminal.render(() => {
    return `Example page.\n${colorList[iColor](text)}`
  })
}


function aquarium() {
  const fish = { left: '<°)))><', right: '><(((°>' }
  let direction = 'right'
  let distance = ' '.repeat(9)

  terminal.command('a', 'Swim Left', () => {
    direction = 'left'
    distance = distance.slice(0, -1)
  })

  terminal.command('d', 'Swim Right', () => {
    if (distance.length >= 50) return
    direction = 'right'
    distance += ' '
  })

  terminal.command('b', 'Back', () => {
    terminal.goTo('example')
  })

  terminal.render(() => {
    return `\n${distance}${fish[direction]}`
  })
}


terminal.initPages([example, aquarium])
terminal.run()
