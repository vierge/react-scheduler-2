import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // avoid object destructuring here to avoid variable name ambiguity re: 'day'
  // takes as props: an array of days, the current day, and a setDay function

  const dayList = props.days.map((day) => {
    const { id, name, spots } = day;
    return (
      <DayListItem
        key={id}
        id={id}
        name={name}
        spots={spots}
        selected={name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul className="day-list">{dayList}</ul>;
}
