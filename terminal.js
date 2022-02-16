import colors from 'ansi-colors'


class Terminal {
  static #pageCollection

  #renderFn
  #commandCollection
  #command
  #pageName
  #menuBar


  /**
   * Registers all pages of the terminal
   */
  initPages(pageInitiators) {
    const pagesByName = {}

    for (let pageInitiator of pageInitiators) {
      pagesByName[pageInitiator.name] = pageInitiator
    }

    Terminal.#pageCollection = pagesByName
    // set start page
    this.#pageName = pageInitiators[0].name
  }


  /**
   * Starts the terminal app
   */
  run(startPage = this.#pageName) {
    // check if the terminal is a TTY (required for stdin raw mode)
    if (!process.stdin.isTTY) {
      console.log('The input device is not a TTY.')
      return
    }

    this.goTo(startPage)
    this.#renderFn()
    this.#listen()
  }


  /**
   * Adds a command to the command collection
   */
  command(command, name, fn) {
    this.#commandCollection[command] = { name, fn }
  }


  /**
   * Sets the render function
   */
  render(fn) {
    this.#renderFn = () => {
      console.clear()
      if (this.#menuBar !== false) console.log(this.#menuBar)
      console.log(fn())
    }
  }


  /**
   * Switches to the given page
   */
  goTo(page) {
    this.render(() => 'terminal.render not found')
    this.#commandCollection = {}
    this.#menuBar = undefined

    if (Terminal.#pageCollection.hasOwnProperty(page)) {
      this.#pageName = page
      Terminal.#pageCollection[page]()
    } else {
      this.#pageName = 'empty'
    }

    if (this.#menuBar === undefined) {
      this.menu(Object.keys(this.#commandCollection))
    }
  }


  /**
   * Specifies the appearance of the menu bar
   */
  menu(commands) {
    if (commands === false) { this.#menuBar = false; return }

    let barStr = ` ${capitalizeFirstLetter(this.#pageName)} ::`

    for (let command of commands) {
      if (this.#commandCollection.hasOwnProperty(command)) {
        let name = this.#commandCollection[command].name
        barStr += `   [${command}] ${name}`
      }
    }

    this.#menuBar = colors.inverse(barStr + ' ')
  }


  /**
   * Closes the terminal
   */
  exit() {
    process.exit()
  }


  /**
   * Listens to the next keyboard input
   */
  #listen() {
    const stdin = process.stdin

    stdin.setRawMode(true)  // only works if stdin is a TTY
    stdin.setEncoding('utf8')
    stdin.resume()

    // add a one-time event listener to stdin
    stdin.once('data', (char) => {
      stdin.pause()
      this.#command = char
      this.#execute()
    })
  }


  /**
   * Executes the command
   */
  async #execute() {
    if (this.#commandCollection.hasOwnProperty(this.#command)) {
      await this.#commandCollection[this.#command].fn()

      // render the page
      this.#renderFn()
    }

    // listen to next input
    this.#listen()
  }
}


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export default new Terminal()
