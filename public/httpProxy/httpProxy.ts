import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http'
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import {AuthService} from '../services/auth.service'

@Injectable()
export class HttpProxy{
    
    constructor(private http:Http, private authService:AuthService){
        
    }
    
    private addAuthHeader(headers:Headers){
        headers.append('Authorization', 'Bearer '+this.authService.getToken());
    }
    
    private addContentType(headers:Headers, format:string){
        headers.append('Content-Type', format);
    }
    
    private configRequestOptions(skipAuth:boolean, format?:string, options?:RequestOptionsArgs) : RequestOptionsArgs{

        if (options == null || options == undefined) {
            options = {};
        }

        if (options.headers == null || options.headers == undefined) {
            options.headers = new Headers();
        }
        
        if (!skipAuth) {
            this.addAuthHeader(options.headers);
        }
        
        if (format != undefined && format != null && format != ''){
            this.addContentType(options.headers, format);
        }      
        
        return options;
    }
    
    public get(url:string, options?:RequestOptionsArgs, skipAuth:boolean = true): Observable<Response>{
        
        options = this.configRequestOptions(skipAuth, null ,options);
        
        return this.http.get(url, options);
    }
    
    public post(url:string, body:string, format?:string, options?:RequestOptionsArgs,  skipAuth:boolean = true):Observable<Response>{
        options = this.configRequestOptions(skipAuth, format, options);
        
        return this.http.post(url, body, options);
    }
    
}