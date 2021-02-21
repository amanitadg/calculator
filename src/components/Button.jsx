import React from 'react';
import './Button.css';

const whatButton = val => {
    if (isNaN(val) && '+-=×÷'.includes(val)) {
        return 'operator'
    } else {
        if (isNaN(val) && val === 'BS') {
            return 'backspace';
        } else {
            if (isNaN(val)) {
                return 'extraOperator';
            } else {
                return 'number';
            }
        }
    } 
}

const Button = (props) => (
    <div className={`button ${
        whatButton(props.children)
    }`}
        onClick={() => props.handleButtonClick(props.children)}
    >{props.children}</div>
)

export default Button;