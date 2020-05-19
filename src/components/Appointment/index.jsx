// react imports
import React, { useState } from 'react'

// styles imports
import "./styles.scss"

// component import
import Header from "./Header"
import Show from "./Show"
// import Form from "./Form"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";


  const { interview, onAdd } = props;

  console.log(interview);
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment" key={interview}>
      <header><Header /></header>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer.name} />}

    </article>
  )
}