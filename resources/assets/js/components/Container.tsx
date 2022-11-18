import * as React from 'react';

interface ContainerProps{
    children?: any,
    customStyles?: Object,
}

export default function Container(props: ContainerProps){

    return(
        <div style={props.customStyles} className='container'>
            {
                props?.children
            }
        </div>
    )

}