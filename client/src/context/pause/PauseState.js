import React, { useReducer } from 'react'
import Axios from 'axios'

import PauseContext from './pauseContext'
import PauseReducer from './pauseReducer'

import { SET_PAUSE, GET_PAUSE, PAUSE_ERROR } from '../types'

const PauseState = (props) => {
  const initialState = {
    pause: false,
  }

  const [state, dispatch] = useReducer(PauseReducer, initialState)

  // Set pause
  const setPause = async (pause) => {
    try {
      const res = await Axios.put(`api/users/pause/${pause}`)
      dispatch({ type: SET_PAUSE, payload: res.data.pause })
    } catch (error) {
      dispatch({ type: PAUSE_ERROR })
    }
  }

  // Get pause
  const getPause = async () => {
    try {
      const res = await Axios.get('api/users/pause')
      dispatch({ type: GET_PAUSE, payload: res.data.pause })
    } catch (error) {
      dispatch({ type: PAUSE_ERROR })
    }
  }

  return (
    <PauseContext.Provider
      value={{
        pause: state.pause,
        getPause,
        setPause,
      }}
    >
      {props.children}
    </PauseContext.Provider>
  )
}

export default PauseState
