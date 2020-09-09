import React, { useContext, useState, useEffect } from 'react'
import PlayerContext from '../../context/player/playerContext'
import { Next } from 'react-bootstrap/esm/PageItem'

const PlayerForm = () => {
  const playerContext = useContext(PlayerContext)
  const { updatePlayer, current, clearCurrent } = playerContext

  useEffect(() => {
    if (current !== null) {
      setPlayer(current)
    } else {
      setPlayer({
        Name: '',
        owner: '',
        price: '',
      })
    }
  }, [playerContext, current])

  const [player, setPlayer] = useState({
    Name: '',
    owner: '',
    price: '',
  })

  const onChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (current !== null) {
      updatePlayer(player)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  const { Name, owner, price } = player

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update player' : 'Select Player'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='Name'
        value={Name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Owner'
        name='owner'
        value={owner}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='price'
        name='price'
        value={price}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update player' : ''}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}

export default PlayerForm
