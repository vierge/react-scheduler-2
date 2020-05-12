import React from "react";
import classnames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props
  const dayClass = ["day-list__item", { 
    "day-list__item--selected": selected, 
    "day-list__item--full": spots === 0 
  }];

  return (
    <li className={classnames(dayClass)} onClick={(() => setDay(name))}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  )
}