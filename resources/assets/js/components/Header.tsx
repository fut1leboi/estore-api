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
        const actions = new AuthActions();
        dispatch(actions.clear());
    }

    const UserProfilePicture: ()=>JSX.Element = () => {
        let source: any = user.profile_picture || 'images/person_placeholder.jpg';
        console.log(source);
        return (
            <img alt='profile picture' className='header-nav__icon' src={source}/>
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
                                <button onClick={()=>isAuthorized ? handleSignOut() : setModalVisible(!isModalVisible)}>
                                    {isAuthorized ? <UserProfilePicture/> : <img className='header-nav__icon' src={'/images/person.svg'}/>}

                                </button>
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
