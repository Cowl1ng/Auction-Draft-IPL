import React, { useContext, Fragment, useEffect } from 'react'
import PlayerContext from '../../context/player/playerContext'

import { Button } from 'react-bootstrap'

const PlayerList = () => {
  const playerContext = useContext(PlayerContext)

  const { loadPlayers, players, filtered, setCurrent } = playerContext

  useEffect(() => {
    loadPlayers()
  }, [])

  return (
    <div>
      <Fragment>
        {players !== null ? (
          filtered !== null ? (
            filtered.map((player) => (
              <div>
                <h1>
                  Player: {player.Name}
                  <br />
                  Owner: {player.owner}
                  <br />
                  Price: {player.price}
                </h1>
                <Button onClick={() => setCurrent(player)}>Edit</Button>
              </div>
            ))
          ) : (
            players.map((player) => (
              <div key={player._id}>
                <h1 key={player._id}>
                  Player: {player.Name}
                  <br />
                  Owner: {player.owner}
                  <br />
                  Price: {player.price}
                </h1>
                <Button onClick={() => setCurrent(player)}>Edit</Button>
              </div>
            ))
          )
        ) : (
          <h1>Loading Players...</h1>
        )}
      </Fragment>
    </div>
  )
}

export default PlayerList
