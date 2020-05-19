import React, { useState } from 'react'

export default function useVisualMode(init) {

  const [mode, setMode] = useState(init)
  const [history, setHistory] = useState([init]);

  function transition(input, replace) {
    replace ? history[history.length - 1] = input : setHistory([...history, input])
    setMode(input);

  }

  function back() {
    history.length > 1 && history.pop()
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back }

}