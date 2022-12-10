import * as React from 'react';

import Container from './Container';
import Logo from './Logo';
import {Link} from "react-router-dom";
import AuthorizationModal from './modals/AuthorizationModal';
import Dropdown, {DropdownItem} from './Dropdown';
import {useDispatch, useSelector} from "react-redux";
import AuthActions from "../actions/AuthActions";


export default function Header(): JSX.Element{

    const [isModalVisible, setModalVisible] = React.useState(false);

    const user:any = useSelector((state:any)=>state.auth.user);
    const isAuthorized: boolean = useSelector((state:any)=>state.auth.isAuthorized);
    const dispatch:any = useDispatch();

    const handleSignOut: ()=>void = ()=>{
        const actions: AuthActions = new AuthActions();
        dispatch(actions.clear());
        localStorage.removeItem('auth');
    }

    const UserAuthorizedComponent: ()=>JSX.Element = () => {
        let source: string = user.profile_picture || 'images/person_placeholder.jpg';
        return (
            <>
                <Link to='/profile'>
                    <img alt='Profile picture' className='header-nav__profile-picture' src={source}/>
                </Link>
                <Dropdown>
                    <DropdownItem>
                        <button onClick={handleSignOut}>Выйти</button>
                    </DropdownItem>
                </Dropdown>
            </>
        )
    }

    const AnonymousComponent: ()=>JSX.Element = () => {
        return (
            <button onClick={()=>setModalVisible(!isModalVisible)}>
                <img alt='Auth actions' className='header-nav__icon' src={'/images/person.svg'}/>
            </button>
        )
    }

    return(
        <header className='header'>
            <Container>
                <div className="header__inner">
                    <div className="header__part">
                        <Logo/>
                        <nav className='header-nav'>
                            <ul className="header-nav__list">
                                <li className="header-nav__item">
                                    <Link className='header-nav__link' to="/">Каталог</Link>
                                </li>
                                <li className="header-nav__item">
                                    <Link className='header-nav__link' to="/">Категории</Link>
                                    <Dropdown>
                                        <DropdownItem>
                                            <Link to='/categories/1'>dasdas</Link>
                                        </DropdownItem>
                                    </Dropdown>
                                </li>
                                <li className="header-nav__item">
                                    <Link className='header-nav__link' to="/locations">Магазины</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                <div className='header__part'>
                    <nav className='header-nav'>
                        <ul className="header-nav__list">
                            <li className="header-nav__item">
                                <Link to="/"><img className='header-nav__icon' src='/images/cart.svg'/></Link>
                            </li>
                            <li className="header-nav__item">
                                {
                                    isAuthorized ? <UserAuthorizedComponent/> : <AnonymousComponent/>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
                </div>
            </Container>
            <AuthorizationModal visible={isModalVisible} closeCallback={()=>setModalVisible(false)}/>
        </header>
    )

}
