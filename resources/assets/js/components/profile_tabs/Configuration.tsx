import * as React from 'react';

export default function ConfigurationTab(){
    const [showEmail, setShowEmail] = React.useState<boolean>(false);
    const [anonymousMode, setAnonymousMode] = React.useState<boolean>(false);

    return(
        <section className="profile-tab">

            <h2 className="profile-tab__title">Конфигурация</h2>
            <div className="profile-tab__block">
                <h3 className='profile-tab__subtitle'>
                    Конфиденциальность
                </h3>
                <fieldset className='profile-tab__fieldset'>
                    <label htmlFor="show_email" className="profile-tab__checkbox-label">ads</label>
                    <input
                        onChange={(e)=>setShowEmail(e.target.value === 'checked')}
                        type="checkbox"
                        name="show_email"
                        id="show_email"
                        className="profile-tab__checkbox"
                    />
                    <label htmlFor="anonymous_mode" className="profile-tab__checkbox-label">das</label>
                    <input
                        onChange={(e)=>setAnonymousMode(e.target.value === 'checked')}
                        type="checkbox"
                        name="anonymous_mode"
                        id="anonymous_mode"
                        className="profile-tab__checkbox"
                    />
                </fieldset>
            </div>
            <div className="profile-tab__block">
                <h3 className='profile-tab__subtitle'>
                    Данные
                </h3>
            </div>
            <div className="profile-tab__block">
                <h3 className='profile-tab__subtitle'>
                    Пароль
                </h3>
            </div>



        </section>
    )

}
