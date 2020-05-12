import React from 'react'

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;

  return (
    <li
      className="interviewers__item"
      key={id}
      alt={name}
      selected={selected}
      onClick={() => setInterviewer()}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
      />
      {name}
    </li>

  )

} 