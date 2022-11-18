interface payloadInterface {
    type: string,
    payload: any,
}

export default class Actions{
    public types: any;
    constructor(reducerPrefix: string) {
        reducerPrefix = reducerPrefix.toUpperCase();
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