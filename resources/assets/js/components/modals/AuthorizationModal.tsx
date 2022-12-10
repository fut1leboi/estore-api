import * as React from 'react';
import CustomModal from './CustomModal';
import AuthActions from "../../actions/AuthActions";
import APIRequest from "../../http/APIRequest";
import {useDispatch} from "react-redux";

export default function AuthorizationModal(props: {visible: boolean, closeCallback: Function}): JSX.Element{

    const [wrapLayoutActive, setWrapLayoutActive] = React.useState(0);
    const [name, setName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const dispatch: any = useDispatch();

    const handleValidate: (proceedAction: ()=>void)=>void = (proceedAction) => {
        setError('');
        if(name.toString().trim() === '' || password.toString().trim() === ''){
            setError('Заполните все поля');
        }
        else
            proceedAction();
    }

    const handleSignUp: ()=>void = () => {
        const authActions: AuthActions = new AuthActions();
        const Request = new APIRequest();
        Request.signUp(name, password)
            .then(res=> {
                const auth = {isAuthorized: true, user: res.data};
                dispatch(authActions.set(auth));
                localStorage.setItem('auth', JSON.stringify(auth));
                props.closeCallback();
            })
            .catch(e=>setError(e.response.data.message))
            .catch(e=>console.log(e));
    }

    const handleSignIn: ()=>void = () => {
        const authActions: AuthActions = new AuthActions();
        const Request = new APIRequest();

        Request.signIn(name, password)
            .then(res=> {
                const auth = {isAuthorized: true, user: res.data};
                dispatch(authActions.set(auth));
                localStorage.setItem('auth', JSON.stringify(auth));
                props.closeCallback();
            })
            .catch(e=>setError(e.response.data.message))
            .catch(e=>console.log(e));
    }


    return (
        <CustomModal visible={props.visible} closeCallback={props.closeCallback}>
            <div className="auth-layout">
                <div className="auth-wrap" style={{transform: `translateX(-${wrapLayoutActive*450}px)`}}>
                    <div className="auth">
                        <h3 className="auth__title">Вход</h3>
                        <div className="auth__fields-wrap">
                            <input value={name} placeholder='Имя' type="text" onChange={(e)=>setName(e.target.value)} name="email" className='auth__field'/>
                            <input value={password} placeholder='Пароль' type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className='auth__field'/>
                        </div>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(wrapLayoutActive+1)}>Еще нет аккаунта?</button>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(wrapLayoutActive-1)}>Забыли пароль?</button>
                        <button onClick={()=>handleValidate(handleSignIn)} className='auth__button'>Войти</button>

                    </div>
                    <div className="auth">
                        <h3 className="auth__title">Регистрация</h3>
                        <div className="auth__fields-wrap">
                            <input value={name} placeholder='Имя' type="text" onChange={(e)=>setName(e.target.value)} name="email" className='auth__field'/>
                            <input value={password} placeholder='Пароль' type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className='auth__field'/>
                        </div>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(wrapLayoutActive-1)}>Уже есть аккаунт?</button>
                        <button onClick={()=>handleValidate(handleSignUp)} className='auth__button'>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
            {error !== '' ? (<p className='auth__error'>{error}</p>) : null}

        </CustomModal>
    )
}
