// react imports
import React from 'react'

// styles imports
import "./styles.scss"

// component import
import Header from "./Header"
import Show from "./Show"
// import Form from "./Form"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from './Form'

export default function Appointment(props) {

  const { id, interview, interviewers, bookInterview } = props;

  // states for visual mode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // custom visual mode hook
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )


  function save(name, interviewer) {

    const newInterview = {
      student: name,
      interviewer: interviewer
    }
    bookInterview(id, newInterview).then(res => transition(SHOW))
  }



  return (
    <article className="appointment" key={interview}>
      <header><Header /></header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer.name} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} />}
    </article>
  )
}