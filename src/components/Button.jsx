import React from "react";
import classNames from 'classnames';

import "./Button.scss"

export default function Button(props) {
  const { children, confirm, danger, disabled, onClick } = props
  const buttonClass = classNames("button", {
      "button--danger" : danger,
      "button--confirm" : confirm
  });

  return (
    <button 
      className={buttonClass} 
      onClick={onClick}
      disabled={disabled}
      >
        {children}
      </button>
  )
}
