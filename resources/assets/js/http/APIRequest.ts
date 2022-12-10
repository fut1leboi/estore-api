import axios from "axios";

export default class APIRequest{
    requestDomain:string;
    config: any;
    auth: {id: string|number, token: string};
    constructor(userId = null, token = null) {

        this.requestDomain = '/';//localhost
        this.auth = {id: userId, token: token}; //mandatory params to make requests
        this.config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    }

    makeAuthorizedRequest(url: string, data:any): Promise<any>{
        return axios.post(url, {...this.auth, ...data}, this.config)
    }

    signUp(name: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/signup`,{name: name, password: password}, this.config);
    }

    signIn(name: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/signin`,{name: name, password: password}, this.config);
    }

    updateProfilePicture(image: any): Promise<any>{
        return this.makeAuthorizedRequest(`${this.requestDomain}user/profile_picture`, {image: image})
    }
}
