import { AbstractApiService } from "../HttpClient";
export interface IRegisterRequest {
    name: null | string,
    email: null | string,
    phone: null | string,
    password: null | string,
    password_confirmation: null | string
}
export class RegisterService extends AbstractApiService {
    constructor(){
        super('register')
    }

    public register(request: IRegisterRequest) : Promise<any> {
        return this.http.post('', {...request}).then(
            this.handleResponse.bind(this)
        ).catch(
            this.handleError.bind(this)
        )
    }
}