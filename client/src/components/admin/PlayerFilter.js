import React, { useContext, useRef, useEffect } from 'react'
import PlayerContext from '../../context/player/playerContext'

const PlayerFilter = () => {
  const playerContext = useContext(PlayerContext)
  const text = useRef('')

  const { filterPlayers, clearFilter, filtered } = playerContext

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPlayers(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  )
}

export default PlayerFilter
