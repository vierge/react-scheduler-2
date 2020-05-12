import React from 'react'

import "./Interviewers.scss"

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;
  const selectedClass = [selected && "interviewers__item--selected", selected && "interviewers__item--selected-image"];

  return (
    <li
      className={`interviewers__item ${selectedClass[0]}`}
      id={id}
      alt={name}
      selected={selected}
      onClick={() => setInterviewer(id)}
    >
      <img
        className={`interviewers__item-image ${selectedClass[1]}`}
        src={avatar}
      />
      {selected && name}
    </li>

  )

} 