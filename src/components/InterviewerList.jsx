import React from 'react'

import InterviewerListItem from "components/InterviewerListItem.jsx"

import "./Interviewers.scss";

export default function InterviewerList(props) {

  const { interviewers, number, setInterviewer } = props;

  const entityList = interviewers.map(entity => {
    const { id, name, avatar, selected } = entity;
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={selected}
        setInterviewer={setInterviewer}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        {number}
      </h4>
      <ul className="interviewers__list">
        {entityList}
      </ul>
    </section>

  )




}