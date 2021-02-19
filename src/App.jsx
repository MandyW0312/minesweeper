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
    state: 'new',
    mines: 10,
    difficulty: 0,
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
    console.log(game)
  }

  handleClickOnCell = async (row, column) => {
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}`
    const body = { row: row, column: column }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const game = await response.json()
    this.setState(game)
  }

  render() {
    return (
      <div className="gameboard">
        <header>
          Minesweeper - <button onClick={this.handleNewGame}>New Game</button>
        </header>
        <section>
          <ul>
            {this.state.board.map((boardRow, rowIndex) => {
              return boardRow.map((cell, columnIndex) => {
                return (
                  <li
                    key={columnIndex}
                    onClick={() =>
                      this.handleClickOnCell(rowIndex, columnIndex)
                    }
                  >
                    {cell}
                  </li>
                )
              })
            })}
          </ul>
        </section>
        <footer>
          <p>This game of Minesweeper was created by Mandy Wade</p>
        </footer>
      </div>
    )
  }
}
