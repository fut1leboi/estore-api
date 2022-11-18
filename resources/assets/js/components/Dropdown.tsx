import * as React from 'react';

interface DropdownProps{
  children?: JSX.Element,
  onTrigger?: ()=>void
}

export const DropdownItem = (props: {children: React.ReactNode}): JSX.Element => {

  return (
      <li className="dropdown-list__item">{props.children}</li>
  )
}

export default function Dropdown(props: DropdownProps){

  const [visible, setVisible] = React.useState<boolean>(false);


  const open: ()=>void = React.useCallback(()=>{setVisible(true)}, []);
  const close: ()=>void = React.useCallback(()=>setVisible(false), []);
  const apperanceTransform: string = `translateY(${visible ? '20' : '0'}px)`;
  const rotateTransform: string = `rotate(${visible ? '180' : '0'}deg)`;

  return (
    <div onMouseLeave={close} className="dropdown">
      <div className="dropdown__trigger" onMouseEnter={open} >
        <div className="dropdown__arrow-wrapper" style={{transform: rotateTransform}}>
        <i className="fa-shard fa-solid fa-angle-down"/>
        </div>
      </div>
      {visible ? (
      <div className="dropdown__content" style={{opacity: +visible, transform: apperanceTransform}}>
        <ul className="dropdown-list">
          {props.children}
        </ul>
      </div>
      ) : null}

    </div>
  )
}