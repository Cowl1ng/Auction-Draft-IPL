import React, { useContext, Fragment, useEffect } from 'react'
import PlayerContext from '../../context/player/playerContext'

import { Button } from 'react-bootstrap'

const PlayerList = () => {
  const playerContext = useContext(PlayerContext)

  const { loadPlayers, players, filtered, setCurrent } = playerContext

  useEffect(() => {
    loadPlayers()
    console.log(`LOADINGPLAYERS`)
    console.log(`PLAYERS: ${players}`)
  }, [])

  return (
    <div>
      <Fragment>
        {players !== null ? (
          filtered !== null ? (
            filtered.map((player) => (
              <div>
                <h1 key={player.Name}>
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
              <div>
                <h1 key={player.Name}>
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
