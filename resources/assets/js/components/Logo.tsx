import * as React from 'react';
import {Link} from "react-router-dom";
interface LogoProps{
    width?: number,
    height?: number
}

export default function Logo(props: LogoProps){

    const size = {height: props.height ? props.height : 96, width: props.width ? props.width : 96}

    return(
        <Link to='/'>
            <img src={'images/logo.svg'} style={{height: size.height, width: size.width}}/>
        </Link>

    )

}
