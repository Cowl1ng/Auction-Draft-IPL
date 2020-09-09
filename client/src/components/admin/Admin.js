import React from 'react'
import PlayerList from './PlayerList'
import PlayerFilter from './PlayerFilter'
import PlayerForm from './PlayerForm'

import { Row, Col } from 'react-bootstrap/'

const Admin = () => {
  return (
    <Row>
      <Col>
        <PlayerForm />
      </Col>
      <Col>
        <PlayerFilter />
        <PlayerList />
      </Col>
    </Row>
  )
}

export default Admin
