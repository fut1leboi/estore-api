interface payloadInterface {
    type: string,
    payload: any,
}
/**
 *
* */
export default class Actions{
    public types: any;
    private initialState: any;
    constructor(reducerPrefix: string, initialState: any) {
        reducerPrefix = reducerPrefix.toUpperCase();
        this.initialState = Object.keys(initialState).length > 0 ? initialState : {};
        this.types = {
            set: reducerPrefix + '_SET',
            clear: reducerPrefix + '_CLEAR',
            add: reducerPrefix + '_ADD'
        }
    }

    public add(payload: any): payloadInterface {
        return {type: this.types.add, payload: payload};
    }

    public set(payload: any): payloadInterface{
        return {type: this.types.set, payload: payload};
    }

    public clear(): {}{
        return {type: this.types.clear};
    }
}
