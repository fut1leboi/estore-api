import * as React from 'react';

export default function LeftNav(props: {callback: Function}): JSX.Element{
    return (
        <button onClick={()=>props.callback()} className='slider__button_left'>
            <i className="fa-solid fa-chevron-left slider__icon"/>
        </button>
    )
}