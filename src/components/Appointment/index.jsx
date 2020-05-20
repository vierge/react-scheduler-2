// react imports
import React from 'react'

// styles imports
import "./styles.scss"

// component import
import Header from "./Header"
import Show from "./Show"
// import Form from "./Form"
import Empty from "./Empty"
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode"
import Form from './Form'
import Confirm from "./Confirm"

export default function Appointment(props) {

  const { id, interview, interviewers, bookInterview, cancelInterview } = props;

  // states for visual mode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const DESTROY = "DESTROY";
  // custom visual mode hook
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )


  function save(name, interviewer) {

    const newInterview = {
      student: name,
      interviewer: interviewer
    }
    transition(SAVING);
    bookInterview(id, newInterview).then(res => transition(SHOW))
  }

  function destroy() {

    transition(DELETING);
    cancelInterview(id).then(res => transition(EMPTY));

  }



  return (
    <article className="appointment" key={interview}>
      <header><Header /></header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer.name} onDelete={() => transition(DESTROY)} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} />}
      {mode === DESTROY && <Confirm onConfirm={destroy} message="Are you sure you want to delete this appointment?" />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
  )
}