import type { AxiosResponse } from "axios";
import { AbstractApiService } from "../HttpClient";
export class GetArticle extends AbstractApiService {
    constructor(){
        super('articles')
    }

    public getList(params: any) : Promise<AxiosResponse> {
        return this.http.get(
          '',
          {
            // params: {
            //   sort_order: 'DESC',
            //   ...params
            // }
          },
          ).then(
            this.handleResponse.bind(this)
        ).catch(
            this.handleError.bind(this)
        )
    }
}