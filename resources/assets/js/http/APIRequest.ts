import axios from "axios";

export default class APIRequest{
    private readonly requestDomain:string;
    private readonly config: any;
    protected auth: {id: string|number, token: string};
    constructor(userId = null, token = null) {

        this.requestDomain = '/api/'; //localhost
        this.auth = {id: userId, token: token}; //mandatory params to make requests
        this.config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    }

    public static get(url: string){
        return axios.get(url).then(res=>res.data);
    }

    public static post(args: any){
        return axios.post(args).then(res=>res.data);
    }


    public makeAuthorizedRequest(url: string, data:any): Promise<any>{
        return axios.post(url, {...this.auth, ...data}, this.config)
    }

    public signUp(email: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/sign_up`, {email: email, password: password}, this.config);
    }

    public signIn(email: string, password: string): Promise<any>{
        return axios.post(`${this.requestDomain}user/sign_in`, {email: email, password: password}, this.config);
    }

    public updateProfilePicture(image: any): Promise<any>{
        return this.makeAuthorizedRequest(`${this.requestDomain}user/profile_picture`, {image: image});
    }

    public getProductsList(length = 8, offset = 0, sort="DESC"){
        return axios.post(`${this.requestDomain}products/get`, {length: length, offset: offset, sort: sort}, this.config);
    }
}
