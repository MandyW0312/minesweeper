import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: '',
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
    state: '',
    mines: '',
    difficulty: 0,
  }

  async componentDidMount() {
    await fetch('https://minesweeper-api.herokuapp.com/games/10')
      .then(response => {
        return response.json()
      })
      .then(apiData => this.setState({ board: apiData.board }))
  }

  handleClickOnCell = async (theClickedRowIndex, theClickedColumnIndex) => {
    const newState = this.state
    newState.board[theClickedRowIndex][theClickedColumnIndex] = 'x'
    this.setState(newState)

    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newState),
      }
    )
    const json = await response.json()
  }

  render() {
    return (
      <div className="gameboard">
        <header>Minesweeper</header>
        <section>
          <ul>
            {this.state.board.map((row, rowIndex) => {
              return row.map((cell, columnIndex) => {
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
