// react imports
import React, { useState } from 'react'

// styles imports
import "./styles.scss"

// component import
import Header from "./Header"
import Show from "./Show"
// import Form from "./Form"
import Empty from "./Empty"


export default function Appointment(props) {

  const { interview } = props;

  return (
    <article className="appointment" key={interview}>
      <header><Header /></header>
      {interview ?
        <Show student={interview.student} interviewer={interview.interviewer.name} /> :
        <Empty />}
    </article>
  )
}