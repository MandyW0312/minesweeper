import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [],
  }

  handleNewGame = async difficultyNumber => {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games?difficulty=${difficultyNumber}`,
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
    let header =
      'The Daleks are out to get you and The Doctor, use the Sonic Screwdriver to Flag the Bombs! ALLONS-Y!'
    if (this.state.state === 'won') {
      header = 'FANTASTIC! - You WON!!!!'
    }
    if (this.state.state === 'lost') {
      header = 'Invasion of the Daleks! - You LOST!'
    }

    return (
      <div className="gameboard">
        <header> </header>
        <article>
          <h3>{header}</h3>
        </article>
        <article>
          <button onClick={() => this.handleNewGame(0)}>Easy</button>
          <button onClick={() => this.handleNewGame(1)}>Medium</button>
          <button onClick={() => this.handleNewGame(2)}>Hard</button>
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
                          key={columnIndex}
                          className={
                            cell === '_'
                              ? 'revealed'
                              : cell === 'F'
                              ? 'flagged'
                              : cell === '@'
                              ? 'flagbomb'
                              : cell === '*'
                              ? 'bomb'
                              : null
                          }
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
