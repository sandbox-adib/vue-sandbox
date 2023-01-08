import type { AxiosResponse } from "axios";
import { AbstractApiService } from "../HttpClient";
export interface ILoginRequest {
    email: null | string,
    password: null | string,
}
export class LoginService extends AbstractApiService {
    constructor(){
        super('login')
    }

    public authenticate(request: ILoginRequest) : Promise<AxiosResponse> {
        return this.http.post('', {...request}).then(
            this.handleResponse.bind(this)
        ).catch(
            this.handleError.bind(this)
        )
    }
}