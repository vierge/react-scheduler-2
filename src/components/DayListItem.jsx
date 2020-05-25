import React from "react";
import classnames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = [
    "day-list__item",
    {
      "day-list__item--selected": selected,
      "day-list__item--full": spots === 0,
    },
  ];
  const formatSpots = (val) => {
    return `${val === 0 ? `no` : val} spot${val !== 1 ? `s` : ``} remaining`;
  };

  return (
    <li className={classnames(dayClass)} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light" data-testid="Spots">
        {formatSpots(spots)}
      </h3>
    </li>
  );
}
