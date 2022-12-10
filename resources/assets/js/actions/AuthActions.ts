import Actions from "./Actions";

export default class AuthActions extends Actions{
    constructor() {
        super('auth',
            {isAuthorized: false, user: {name: null, profile_picture: null}}
        );
    }
}
