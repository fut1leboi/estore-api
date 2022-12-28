import * as React from 'react';
import CustomModal from './CustomModal';
import AuthActions from "../../actions/AuthActions";
import APIRequest from "../../http/APIRequest";
import {useDispatch} from "react-redux";
import validate from '../../utils/validate';

export default function AuthorizationModal(props: {visible: boolean, closeCallback: Function}): JSX.Element{

    const [wrapLayoutActive, setWrapLayoutActive] = React.useState(0);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string|boolean>('');
    const dispatch: any = useDispatch();

    const handleValidate: (proceedAction: ()=>void)=>void = (proceedAction) => {
        const validateResult = validate.compose(
            ()=>validate.blank(email, password),
            ()=>validate.email(email),
        );
        setError(validateResult);

        if(validateResult === false) {
            proceedAction();
        }
    }

    const handleSignUp: ()=>void = () => {
        const authActions: AuthActions = new AuthActions();
        const Request = new APIRequest();
        Request.signUp(email, password)
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

        Request.signIn(email, password)
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
                            <input value={email} placeholder='Электронная почта' type="text" onChange={(e)=>setEmail(e.target.value)} name="email" className='auth__field'/>
                            <input value={password} placeholder='Пароль' type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className='auth__field'/>
                        </div>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(wrapLayoutActive+1)}>Еще нет аккаунта?</button>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(2)}>Забыли пароль?</button>
                        <button onClick={()=>handleValidate(handleSignIn)} className='auth__button'>Войти</button>

                    </div>
                    <div className="auth">
                        <h3 className="auth__title">Регистрация</h3>
                        <div className="auth__fields-wrap">
                            <input value={email} placeholder='Электронная почта' type="text" onChange={(e)=>setEmail(e.target.value)} name="email" className='auth__field'/>
                            <input value={password} placeholder='Пароль' type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className='auth__field'/>
                        </div>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(wrapLayoutActive-1)}>Уже есть аккаунт?</button>
                        <button onClick={()=>handleValidate(handleSignUp)} className='auth__button'>Зарегистрироваться</button>
                    </div>
                    <div className="auth">
                        <h3 className="auth__title">Восстановление пароля</h3>
                        <div className="auth__fields-wrap">
                            <input value={email} placeholder='Электронная почта' type="text" onChange={(e)=>setEmail(e.target.value)} name="email" className='auth__field'/>
                        </div>
                        <button className="auth__control" onClick={()=>setWrapLayoutActive(0)}>Вход</button>
                        <button onClick={()=>handleValidate(handleSignUp)} className='auth__button'>Отправить письмо</button>
                    </div>
                </div>
            </div>
            {error !== '' ? (<p className='auth__error'>{error}</p>) : null}

        </CustomModal>
    )
}
