import * as React from 'react';
import Container from './Container';
import AuthorizationModal from './modals/AuthorizationModal';

export default function Footer(){

    const [isModalVisible, setModalVisible] = React.useState(false);

    return(
        <footer className='footer'>
            <Container customStyles={{display: 'flex', justifyContent: 'space-between', borderTop: '3px solid rgba(0,0,0, 0.25)', paddingTop: 20, flexWrap: 'wrap', gap: '20px'}}>
                <ul className="footer-nav">
                    <li className="footer-nav__item">
                        <a href="#" className="footer-nav__link">Каталог</a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="#" className="footer-nav__link">Корзина</a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="#" className="footer-nav__link">Магазины</a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="#" className="footer-nav__link">Категории</a>
                    </li>
                </ul>
                <ul className="footer-nav">
                    <li className="footer-nav__item">
                        <a href="#" className="footer-nav__link">Вход</a>
                    </li>
                    <li className="footer-nav__item">
                        <button onClick={()=>setModalVisible(!isModalVisible)} className="footer-nav__link">Регистрация</button>
                    </li>
                </ul>
            </Container>
            <AuthorizationModal visible={isModalVisible} closeCallback={()=>setModalVisible(false)}/>
        </footer>
    )

}