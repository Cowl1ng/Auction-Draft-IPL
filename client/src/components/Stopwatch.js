import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'

import useInterval from './useInterval'

import { useMutation, useQuery } from 'react-query'

import PlayerContext from '../context/player/playerContext'
import PauseContext from '../context/pause/pauseContext'
import { Row, Button } from 'react-bootstrap'

const maxSeconds = 30

const assignPlayer = async (data) => {
  const player = data.player
  const owner = data.owner
  const price = data.price
  const res = await Axios.put('/api/players/', { player, owner, price })
}

const Stopwatch = ({ winningBid }) => {
  const playerContext = useContext(PlayerContext)
  const pauseContext = useContext(PauseContext)

  const {
    loadNextPlayer,
    loadMaxBid,
    loadBids,
    loadOuts,
    setPause,
    nextPlayer,
    maxBid,
    bids,
    outs,
  } = playerContext

  const { getPause, pause } = pauseContext

  const [seconds, setSeconds] = useState(0)
  const [delay, setDelay] = useState(0)
  const [timer, setTimer] = useState(false)
  const [slowTimer, setSlowTimer] = useState(false)
  const [winningBidValue, setWinningBidValue] = useState(0)

  // Set up timer counting down with delay of 5 seconds at zero
  useInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1)
      setTimer(!timer)
    } else {
      if (delay === 1) {
        // Send winning bid
        if (winningBid) {
          mutate({
            player: winningBid.player,
            owner: winningBid.owner,
            price: winningBid.value,
          })
        } else {
          mutate({ player: nextPlayer, owner: 'teamless', price: 0 })
        }
      }
      setDelay(delay + 1)
      if (delay > 3) {
        setSeconds(maxSeconds)
        setDelay(0)
      }
    }
  }, 1000)

  useEffect(() => {
    setSeconds(maxSeconds)
  }, [winningBidValue])

  useEffect(() => {
    loadNextPlayer()
  }, [delay])

  useEffect(() => {
    loadNextPlayer()
  }, [])

  useEffect(() => {
    loadMaxBid(nextPlayer)
    getPause()
    if (winningBid) {
      setWinningBidValue(winningBid.value)
    }
    loadBids(nextPlayer)
    loadOuts(nextPlayer)
    if (seconds < maxSeconds - 2) {
      if (outs) {
        let outNames = [...new Set(outs.out.map((bid) => bid.owner))]

        if (winningBid) {
          const outNotWinning = []
          for (const outName of outNames) {
            if (outName !== winningBid.owner) {
              outNotWinning.push(outName)
            }
          }
          var outLength = outNotWinning.length
          if (outLength > 2) {
            mutate({
              player: winningBid.player,
              owner: winningBid.owner,
              price: winningBid.value,
            })
            setSeconds(maxSeconds)
          }
        } else {
          var outLength = outNames.length
          if (outLength > 3) {
            mutate({ player: nextPlayer, owner: 'teamless' })
            outLength = 0
            setSeconds(maxSeconds)
          }
        }
      }
    }
    if (pause) {
      setSeconds(maxSeconds)
    }
    if (seconds % 2 === 0) {
      setSlowTimer(true)
    } else if (slowTimer === true) {
      setSlowTimer(false)
    }
  }, [timer])

  useEffect(() => {
    loadNextPlayer()
  }, [slowTimer])

  const [mutate] = useMutation(assignPlayer, {})

  return (
    <div>
      {delay > 0 ? (
        winningBid.owner ? (
          <h1 style={{ fontSize: 65 }}>SOLD TO {winningBid.owner}</h1>
        ) : (
          <h1 style={{ fontSize: 65 }}>SOLD TO NOONE</h1>
        )
      ) : (
        <h1 style={{ fontSize: 65 }}>0 : {seconds}</h1>
      )}
      <br />
      <h1>Highest Bid</h1>
      <br />
      {winningBid ? (
        <h1>
          {winningBid.owner} : £ {winningBid.value}
        </h1>
      ) : (
        <h1></h1>
      )}
    </div>
  )
}

export default Stopwatch
