import axios from "axios";

export default class APIRequest{
    requestDomain:string;
    config: any;
    constructor() {
        this.requestDomain = '/';//localhost
        this.config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    }

    signUp(name: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/signup`,{name: name, password: password}, this.config);
    }

    signIn(name: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/signin`,{name: name, password: password}, this.config);
    }
}