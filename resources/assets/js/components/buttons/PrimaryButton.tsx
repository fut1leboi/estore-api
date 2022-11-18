import * as React from 'react';
import { ProgressPlugin } from 'webpack';

export default function PrimaryButton(props: {handler: Function, title: string}){

    return (
      <button onClick={()=>props.handler} className='primary-button'>{props.title}</button>
    )
}