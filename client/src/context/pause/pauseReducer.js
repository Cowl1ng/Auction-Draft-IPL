import { GET_PAUSE, SET_PAUSE, PAUSE_ERROR } from '../types'

export default (state, action) => {
  switch (action.type) {
    case SET_PAUSE:
    case GET_PAUSE:
      return {
        ...state,
        pause: action.payload,
      }
    case PAUSE_ERROR:
      return {
        ...state,
        pause: false,
        error: action.payload,
      }
    default:
      return state
  }
}
