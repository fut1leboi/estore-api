import * as React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/product';
import CustomSlider from '../components/slider';
import { productsData } from '../dummies';

export default function Home(){

    let sliderImages = [
        {
            original: '/images/slider_2.jpg',
        },
        {
            original: '/images/slider_3.jpg',
        },
    ]
    return(
        <>
            <section className="intro">
                <CustomSlider items={sliderImages}/>
            </section>
        <section className='section'>
            <Container>
                <h2 className="section__title">Распродажи</h2>
                <div className='sales'>
                    <div className="col_lg">
                        <div className="sales__item">
                            <img src={'images/longsleeve.jpg'} className='sales__img' alt="product"/>
                            <a href='#' className="sales__caption">Longsleeve «Почта россии»</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="sales__item">

                        </div>
                    </div>
                    <div className="col_column-layout">
                        <div className="sales__item">
                            <img src={'images/longsleeve.jpg'} className='sales__img' alt="product"/>
                            <a href='#' className="sales__caption">Longsleeve «Почта россии»</a>
                        </div>
                        <div className="sales__item">
                            <img src={'images/longsleeve.jpg'} className='sales__img' alt="product"/>
                            <a href='#' className="sales__caption">Longsleeve «Почта россии»</a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
        <section className="section">
            <Container>
                <h2 className="section__title">Каталог</h2>
                <div className="section__inner">
                    {productsData.map((product, index)=><ProductCard key={index} productData={product}/>)}
                </div>
                <a href="#" style={{padding: 20}} className="section__more">Посмотреть полностью...</a>
            </Container>
        </section>
        </>
    )

}
