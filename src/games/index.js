import Pong from './Pong'
import TicTacToe from './TicTacToe'

export default [
  {
    component: Pong,
    name: `Pong`,
    players: 2,
  },
  {
    component: TicTacToe,
    name: `Tic-Tac-Toe`,
    players: 2,
    state: [
    [ [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ] ]
    ]
  }
]
