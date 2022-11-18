import * as React from 'react';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
export default function CustomSlider(props: {items: any}): JSX.Element{

    const [index, setIndex] = React.useState(0);
    const sliderLayoutRef = React.useRef(null);

    const getStepWidth = () => sliderLayoutRef?.current?.clientWidth || 0;

    const moveForward = () => setIndex(index > props.items.length-2 ? 0 : index+1)
    const moveBackward = () => setIndex(index < 1 ? props.items.length-1 : index-1);

    return (
        <div className='slider'>
            <div className="slider__layout" ref={sliderLayoutRef}>
                <div className="slider__tape" style={{transform: `translateX(-${index*getStepWidth()}px)`}}>
                    {props.items.map((item: any, index: number)=><img key={index} src={item.original} alt="slider-item" className="slider__item" />)}
                </div>

                <div className="slider__overlay">
                    <div className="slider__controls">


                        <LeftNav callback={moveBackward} />
                        <RightNav callback={moveForward}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
