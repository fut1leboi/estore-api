import * as React from 'react';
import { Link } from 'react-router-dom';
import ProductRateStars from './ProductRateStars';

export default function ProductCard(props: {productData?: any}): JSX.Element{




    return (
        <div className="product">
            <div className="product__header">
                <img src={'images/longsleeve.jpg'} alt="product" className="product__image" />
            </div>
            <div className="product__panel">
                <p className="product__name">{props.productData?.name}</p>
                <ProductRateStars rate={props.productData?.rate}/>

                <Link to={`/product/${props.productData?.id}`} className="product__link">Подробнее</Link>
            </div>
        </div>
    )
}
