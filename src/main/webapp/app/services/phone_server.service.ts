import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../app.constants';

@Injectable()
export class PhoneServerService {

    constructor(private http: Http) { }

//    getPage(phoneNum: string, pagesize: number, page: number): string[]  {
//        let resultPage: string[] = new Array();
//        return resultPage = ['TEST', 'SERVER', 'METHOD'];
//    }

    get(phoneNum: string, pagesize: number, page: number): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/phonePage', {
                      params: {
                        'num': phoneNum,
                        'page': page,
                        'pagesize': pagesize
                      }}
            ).map((response: Response) => response.json());
    }
}
