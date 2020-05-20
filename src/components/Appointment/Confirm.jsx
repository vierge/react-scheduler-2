import React from 'react'

import Button from "../Button"

export default function Confirm(props) {

  const { message, onConfirm, onCancel, name, interviewer } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={name && interviewer ? onConfirm(name, interviewer) : onConfirm}>Confirm</Button> {/* not sure if this is necessary */}
      </section>
    </main>

  )

}