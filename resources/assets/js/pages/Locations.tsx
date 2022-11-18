import * as React from 'react';
import Container from '../components/Container';
import Map from '../components/Map';

export default function Locations(): JSX.Element{

    const [cellphone, setCellphone] = React.useState<string>('+79136103930');
    const [email, setEmail] = React.useState<string>('managermail@gmail.com');

    return (
            <Container>
                <section className="section">
                    <div className="locations">
                            <h4 className="section__title">Расположение</h4>
                            <Map/>
                    </div>
                </section>

                <section className="section">
                    <div className="contact">
                        <h4 className="section__title">Контакты</h4>
                        <div className="contact__item">
                            <i className="fa-solid fa-phone contact__icon"/>
                            <p className='contact__key'>Телефон</p>
                            <hr className="splitter" />
                            <a href={`tel:${cellphone}`} className="contact__value">{cellphone}</a>
                        </div>
                        <div className="contact__item">
                            <i className="fa-solid fa-envelope contact__icon"/>
                            <p className='contact__key'>Почта</p>
                            <hr className="splitter" />
                            <a href={`mailto:${email}`} className="contact__value">{email}</a>
                        </div>
                    </div>
                </section>


            </Container>
    )
}