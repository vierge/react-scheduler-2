import React, { useState } from 'react'

import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {



  const { interviewers } = props; // value properties
  const { onSave, onCancel } = props; // action properties

  const [name, setName] = useState("")
  const [interviewer, setInterviewer] = useState(0)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={setName}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={event => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>

  )

}