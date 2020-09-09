import React, { useReducer } from 'react'
import Axios from 'axios'

import PlayerContext from './playerContext'
import PlayerReducer from './playerReducer'
import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  OUTS_LOADED,
  SET_PAUSE,
  LOAD_TEAMS,
  GET_UNDRAFTED,
  FILTER_PLAYERS,
  CLEAR_FILTER,
  PLAYERS_LOADED,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PLAYER,
} from '../types'

const PlayerState = (props) => {
  const initialState = {
    nextPlayer: null,
    players: null,
    error: null,
    maxBid: null,
    bids: null,
    out: null,
    bidStatus: false,
    teams: [],
    team1: [],
    team2: [],
    team3: [],
    team4: [],
    undraftedPlayers: [],
    filtered: null,
    current: null,
    pause: false,
  }

  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  // Load next undrafted player
  const loadNextPlayer = async () => {
    try {
      const res = await Axios.get('/api/players/undrafted/next')
      dispatch({ type: PLAYER_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load all players
  const loadPlayers = async () => {
    try {
      const res = await Axios.get('api/players')
      console.log(JSON.stringify(res.data))
      dispatch({ type: PLAYERS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load max bid
  const loadMaxBid = async (player) => {
    try {
      const res = await Axios.get(`/api/players/max_bid`, {
        params: {
          player: player.Name,
        },
      })
      dispatch({ type: BID_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load all bids for the player
  const loadBids = async (player) => {
    try {
      const res = await Axios.get(`/api/players/bid`, {
        params: {
          player: player.Name,
        },
      })
      dispatch({ type: BIDS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load out bids
  const loadOuts = async (player) => {
    try {
      const res = await Axios.get('/api/players/bid/out', {
        params: {
          player: player.Name,
        },
      })
      dispatch({ type: OUTS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Get all players sorted by team
  const loadTeams = async (users) => {
    let t1Players = []
    let t2Players = []
    let t3Players = []
    let t4Players = []
    const res = await Axios.get(`/api/players/teams`)
    if (users) {
      for (const player of res.data) {
        if (player.owner === users[0]) {
          t1Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[1]) {
          t2Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[2]) {
          t3Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[3]) {
          t4Players.push({ Name: player.Name, price: player.price })
        }
      }
    }
    dispatch({
      type: LOAD_TEAMS,
      payload: { t1Players, t2Players, t3Players, t4Players, teams: res.data },
    })
  }

  // Get undrafted players
  const getUndrafted = async () => {
    try {
      const res = await Axios.get('/api/players/undrafted')
      dispatch({ type: GET_UNDRAFTED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Filter players
  const filterPlayers = (text) => {
    dispatch({ type: FILTER_PLAYERS, payload: text })
  }
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }
  // Set Current Player
  const setCurrent = (player) => {
    dispatch({ type: SET_CURRENT, payload: player })
  }
  // Update current player
  const updatePlayer = async (player) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await Axios.put(`/api/players/${player._id}`, player, config)
      dispatch({ type: UPDATE_PLAYER, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Pause the timer
  const setPause = async (bool) => {
    dispatch({ type: SET_PAUSE, payload: bool })
  }

  return (
    <PlayerContext.Provider
      value={{
        nextPlayer: state.nextPlayer,
        players: state.players,
        error: state.error,
        maxBid: state.maxBid,
        bids: state.bids,
        outs: state.outs,
        teams: state.teams,
        team1: state.team1,
        team2: state.team2,
        team3: state.team3,
        team4: state.team4,
        pause: state.pause,
        undraftedPlayers: state.undraftedPlayers,
        filtered: state.filtered,
        current: state.current,
        loadNextPlayer,
        loadPlayers,
        loadMaxBid,
        loadBids,
        loadTeams,
        loadOuts,
        getUndrafted,
        filterPlayers,
        clearFilter,
        setCurrent,
        updatePlayer,
        clearCurrent,
        setPause,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerState
