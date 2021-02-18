import React, { Component } from 'react'

export class App extends Component {
  state = {
    data: [
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

  handleClickOnCell = async (theClickedRowIndex, theClickedColumnIndex) => {
    const newState = this.state
    newState.data[theClickedRowIndex][theClickedColumnIndex] = 'x'
    this.setState(newState)

    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newState),
        difficulty: '0',
        state: 'new',
        mines: '10',
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
            {this.state.data.map((row, rowIndex) => {
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
