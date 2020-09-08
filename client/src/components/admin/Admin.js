import React from 'react'
import PlayerList from './PlayerList'
import PlayerFilter from './PlayerFilter'

import { Row, Col } from 'react-bootstrap/'

const Admin = () => {
  return (
    <Row>
      <Col>
        <h1>PLAYER FORM</h1>
      </Col>
      <Col>
        <PlayerFilter />
        <PlayerList />
      </Col>
    </Row>
  )
}

export default Admin
