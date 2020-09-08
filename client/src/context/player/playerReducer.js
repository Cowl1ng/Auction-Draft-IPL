import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  SET_PAUSE,
  OUTS_LOADED,
  LOAD_TEAMS,
  GET_UNDRAFTED,
  FILTER_PLAYERS,
  CLEAR_FILTER,
  PLAYERS_LOADED,
  SET_CURRENT,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case PLAYER_LOADED:
      return {
        ...state,
        nextPlayer: action.payload,
      }
    case PLAYERS_LOADED:
      return {
        ...state,
        players: action.payload,
      }
    case BID_LOADED:
      return {
        ...state,
        maxBid: action.payload,
      }
    case BIDS_LOADED:
      return {
        ...state,
        bids: action.payload,
      }
    case OUTS_LOADED:
      return {
        ...state,
        outs: action.payload,
      }
    case GET_UNDRAFTED:
      return {
        ...state,
        undraftedPlayers: action.payload,
      }
    case FILTER_PLAYERS:
      return {
        ...state,
        filtered: state.players.filter((player) => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return player.Name.match(regex) || player.Team.match(regex)
        }),
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case SET_PAUSE:
      return {
        ...state,
        pause: action.payload,
      }
    case PLAYER_ERROR:
      return {
        ...state,
        nextPlayer: null,
        error: action.payload,
      }
    case LOAD_TEAMS:
      return {
        ...state,
        teams: action.payload.teams,
        team1: action.payload.t1Players,
        team2: action.payload.t2Players,
        team3: action.payload.t3Players,
        team4: action.payload.t4Players,
      }
    default:
      return state
  }
}
