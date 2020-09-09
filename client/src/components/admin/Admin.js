import React, { useContext, useState, useEffect } from 'react'
import PlayerList from './PlayerList'
import PlayerFilter from './PlayerFilter'
import PlayerForm from './PlayerForm'
import PauseContext from '../../context/pause/pauseContext'

import { Row, Col, Button } from 'react-bootstrap/'

const Admin = () => {
  const pauseContext = useContext(PauseContext)

  const { pause, setPause } = pauseContext

  const handleClick = () => {
    console.log(`PAUSING/UN`)
    setPause(!pause)
  }

  useEffect(() => {
    console.log(`Pause:${JSON.stringify(pause)}`)
    if (pause) {
      setButtonState('danger')
    } else {
      setButtonState('primary')
    }
  }, [pause, pauseContext])

  const [buttonState, setButtonState] = useState('primary')

  return (
    <Row>
      <Col>
        <PlayerForm />
      </Col>
      <Col>
        <Button size='lg' variant={buttonState} onClick={handleClick}>
          {pause ? <h1>UNPAUSE</h1> : <h1>PAUSE</h1>}
        </Button>
        <PlayerFilter />
        {/* <PlayerList /> */}
      </Col>
    </Row>
  )
}

export default Admin
