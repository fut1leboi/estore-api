import * as React from 'react';

export default function RightNav(props: {callback: Function}): JSX.Element{
    return (
        <button onClick={()=>props.callback()} className='slider__button_right'>
            <i className="fa-solid fa-chevron-right slider__icon"/>
        </button>
    )
}