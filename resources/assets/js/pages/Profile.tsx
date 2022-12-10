import * as React from 'react';
import Container from '../components/Container';
import {useDispatch, useSelector} from "react-redux";
import {User} from "../types";
import gearIcon from '../../img/material/gear.svg';
import historyIcon from '../../img/material/history.svg';
import statisticsIcon from '../../img/material/statistics.svg';
import APIRequest from "../http/APIRequest";
import AuthActions from "../actions/AuthActions";

interface ProfileTab{
    name: string,
    icon: string,
    component: JSX.Element
}

export default function Profile(): JSX.Element{

    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);
    const user: User = useSelector((state: any)=>state.auth.user);
    const dispatch: any = useDispatch();

    const handleProfilePictureChange: (event: any)=>void = (event) =>{
        const api: APIRequest = new APIRequest(user.id);
        const authActions: AuthActions = new AuthActions();
        api.updateProfilePicture(event.target.files[0])
            .then(res=>{
                let data = {isAuthorized: true, user: res.data};
                localStorage.setItem('auth', JSON.stringify(data));
                dispatch(authActions.set(data));
            })
            .catch(e=>console.log(e));
    }

    const profileTabs: Array<ProfileTab> = [
        {
            name: 'Конфигурация',
            icon: gearIcon,
            component: <>Конфигурация</>
        },
        {
            name: 'Статистика',
            icon: statisticsIcon,
            component: <>Статистика</>
        },
        {
            name: 'История заказов',
            icon: historyIcon,
            component: <>История заказов</>
        }
    ]


    return (
        <Container>
            <div className="profile">
                <aside className="profile__side">
                    <div className="profile-picture">
                        <img src={user?.profile_picture || "/assets/img/person_placeholder.jpg"} alt="Profile picture" className="profile-picture__img"/>
                        <label className='profile-picture__trigger' htmlFor="profile-picture">Изменить</label>
                        <input onChange={handleProfilePictureChange} type="file" accept='image/png,image/jpeg' id='profile-picture' className="profile-picture__input"/>
                    </div>
                    <p className="profile__name">{user.name}</p>
                    <nav className="profile-nav">
                        <ul className="profile-nav__list">
                            {
                                profileTabs.map((tab,index)=>(
                                    <button key={index} onClick={()=>setActiveTabIndex(index)}>
                                        <li className="profile-nav__item">
                                                <img className='profile-nav__icon' src={tab.icon}/>
                                                {tab.name}
                                        </li>
                                    </button>
                                ))
                            }
                        </ul>
                    </nav>
                </aside>
                <div className="profile__main">
                    {profileTabs[activeTabIndex].component}
                </div>
            </div>
        </Container>
    )
}
