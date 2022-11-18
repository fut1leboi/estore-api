import * as React from 'react';

export default function CustomModal(props: {visible: boolean,children?: any, closeCallback: Function, slideVelocityS?: number}): JSX.Element{

    const [doDisplay, setDisplay] = React.useState(true);

    React.useEffect(()=>{
        document.body.style.overflow = props.visible ? "hidden" : "";
        setDisplay(true);
        if(!props.visible){
            setTimeout(()=>{

            }, props.slideVelocityS*1000);
        }
    }, [props.visible]);

    return (
        
        <div className='modal' style={{top: props.visible ? 0 : '-100%', transition: `${props.slideVelocityS || 0.2}s linear all`}} onClick={()=>props.closeCallback()}>
            <div className="modal__inner" onClick={(e)=>e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}