import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http'
import {Observable} from 'rxjs/Observable'


export class MockAuthService {

    constructor() {

    }

    public getToken() {
        return "Mock-token";
    }

}