import React from "react";

import "./Button.scss";
import classNames from 'classnames';

export default function Button(props) {
  const { children, confirm, danger, disabled, onClick } = props
  const buttonClass = classNames('button', {
      "button--danger" : danger,
      "button--confirm" : confirm
  })




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
