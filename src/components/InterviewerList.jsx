import React from "react";

import InterviewerListItem from "components/InterviewerListItem.jsx";

import PropTypes from "prop-types";

import "./Interviewers-list.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const entityList = interviewers.map((entity) => {
    const { id, name, avatar } = entity;
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={value === id}
        setInterviewer={(event) => onChange(id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{entityList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
