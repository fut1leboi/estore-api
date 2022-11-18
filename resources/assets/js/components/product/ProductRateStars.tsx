import * as React from 'react';

export default function ProductRateStars(props: {rate: number}): JSX.Element{

    const produceStars = React.useCallback(()=>{
        const output = [];
        for(let i = 1; i <= 5; i++){
            if(i <= props.rate){
                output.push(<i key={i} className="fa-solid fa-star product__icon"/>);
            }
            else{
                output.push(<i key={i} className="fa-regular fa-star product__icon"/>);
            }
        }
        return output
    }, [])



    return (
        <div className="product__rating">
            {produceStars()}
        </div>
    )
}