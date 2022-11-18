import * as React from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Container from "../components/Container";
import { productsData } from "../dummies";
import ProductRateStars from "../components/product/ProductRateStars";
import ProductCard from "../components/product";

interface Product{
  name: string,
  price: string,
  rate: number,
  image: any,
}

export default function Product(): JSX.Element{
  const [product, setProduct] = React.useState<Product>(null);
  const [deliveryType, setDeliveryType] = React.useState<'truck' | 'box'>('truck');
  let params: any = useParams();

  const ProductInfoItem = (props: {propKey: string|number, children: JSX.Element}): JSX.Element => {

    return (
      <div className="product-page__item">
        <p className="product-page__key">{props.propKey}</p>
        {props.children}
      </div>
    )
  }

  React.useEffect(()=>{
    if(params !== undefined){
      //api call to retrieve product data;
      setProduct({
        name: 'Longsleeve "Почта России"',
        price: '1000р.',
        rate: 4,
        image: 'images/longsleeve.jpg',
      });
    }
  }, [params])


  if(product === null)
    return ;
  return (
    <>
      <section className="section">
            <Container>
              <div className="product-page">
                <div className="product-page__demo">
                  <img src={product.image} alt="product" className="product-page__image" />
                </div>
                <div className="product-page__info">
                  <div className="product-page__wrapper">
                    <ProductInfoItem propKey='Название'>
                      <h1>{product.name}</h1>
                    </ProductInfoItem>

                    <ProductInfoItem propKey='Цена'>
                      <p>{product.price}</p>
                    </ProductInfoItem>

                    <ProductInfoItem propKey='Рейтинг'>
                      <ProductRateStars rate={product.rate}/>
                    </ProductInfoItem>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <button onClick={()=>setDeliveryType(deliveryType === 'truck' ? 'box' : 'truck')}>Доставка</button>
                      <i className={`fa-solid fa-${deliveryType}`}/>
                    </div>
                  </div>
                  <PrimaryButton title='В корзину' handler={()=>console.log('')}/>
                </div>
              </div>
            </Container>
      </section>
      <section className='section'>
        <Container>
          <h4 className="section__title">Смотрите еще товары</h4>
          <div className="section__inner">
                    {productsData.map((product, index)=><ProductCard key={index} productData={product}/>)}
          </div>
        </Container>
      </section>
    </>
  )
}
