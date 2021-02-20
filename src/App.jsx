import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
  }

  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    const game = await response.json()
    this.setState(game)
  }
  handleClickOnCellCheck = async (rowIndex, columnIndex) => {
    if (
      this.state.id === undefined ||
      this.state.state === 'won' ||
      this.state.state === 'lost'
    ) {
      return
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    const body = { row: rowIndex, col: columnIndex }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const game = await response.json()
    this.setState(game)
  }

  handleClickOnCellFlag = async (rowIndex, columnIndex) => {
    if (
      this.state.id === undefined ||
      this.state.state === 'won' ||
      this.state.state === 'lost'
    ) {
      return
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
    const body = { row: rowIndex, col: columnIndex }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const game = await response.json()
    this.setState(game)
  }

  render() {
    let header = 'Minesweeper'
    if (this.state.state === 'won') {
      header = 'Minesweeper - You WON!!!!'
    }
    if (this.state.state === 'lost') {
      header = 'Minesweeper - You LOST!'
    }

    return (
      <div className="gameboard">
        <header>
          <h1>{header}</h1>
        </header>
        <article>
          <button onClick={this.handleNewGame}>New Game</button>
        </article>
        <section>
          <table>
            <thead></thead>
            <tbody>
              {this.state.board.map((boardRow, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {boardRow.map((cell, columnIndex) => {
                      return (
                        <td
                          className="cell"
                          key={columnIndex}
                          onClick={() =>
                            this.handleClickOnCellCheck(rowIndex, columnIndex)
                          }
                          onContextMenu={e => {
                            e.preventDefault()
                            this.handleClickOnCellFlag(rowIndex, columnIndex)
                          }}
                        >
                          {cell}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        <footer>
          <p>This game of Minesweeper was created by Mandy Wade</p>
        </footer>
      </div>
    )
  }
}
