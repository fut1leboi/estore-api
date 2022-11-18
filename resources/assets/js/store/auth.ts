interface authStoreInterface {
    isAuthorized: boolean,
    user?: {
        name: string | null,
        profile_picture: string | null
    }
}

import AuthActions from "../actions/AuthActions";
const authActions: any = new AuthActions();
const INITIAL_STATE: authStoreInterface = {isAuthorized: false, user: {name: null, profile_picture: null}};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case authActions.types.set:
            return action.payload;
        case authActions.types.clear:
            return INITIAL_STATE;
        default:
            return state
    }
}
