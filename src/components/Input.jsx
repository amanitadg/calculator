import React from 'react';
import './Input.css';



const Input = (props) => {
    
    return(
        <>
            <div className='display-prev'>{props.value}</div>
            <div className='display-curr'>{props.entry}</div>
        </>
    )
}

export default Input;