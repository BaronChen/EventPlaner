import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import {NgZone} from 'angular2/core'
import 'rxjs/Rx'
import {LocalStorageService} from "./localStorage.service"
import {Router} from 'angular2/router';


@Injectable()
export class AuthService {
    
    //put the config here just for now
    private clientId:string;
    private authUrl:string;
    //fake nonce
    private nonce:string;
    private redirectUrl:string;
    
    private tokenStoreKey : string = "GoogleAccessToken";

  
    
    constructor(private http:Http, private localStorageService:LocalStorageService, private ngZone:NgZone, private router:Router){ 
        this.clientId = "548349193429-itghl9ni7ln5lfrlngqu3092tgdrcssr.apps.googleusercontent.com";
        this.nonce = Math.random().toString(36).substring(10);
        this.redirectUrl = encodeURI("http://localhost:8080/app/tokenhandler/tokenhandler.html");
        var state = 'PlanDetail'; 
        this.authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&`+
                            `state=${state}&`+
                            `redirect_uri=${this.redirectUrl}&`+
                            `response_type=token&`+
                            `client_id=${this.clientId}&`//+
                         //   `nonce=${this.nonce}`    
    }
    
    public getExternalAuthLink() {
        return this.authUrl;
    }
    
    public login(){
        var token = this.localStorageService.getItem(this.tokenStoreKey);
        if(token && token != undefined){
            alert('token exist! token: '+token);
            return;
        }
        
        var authUrl = this.getExternalAuthLink();

        (<any>window).authService = this;

		var oauthWindow = window.open(authUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    }
    
    public logOut(){
        this.localStorageService.removeItem(this.tokenStoreKey);
        alert('Done!');
        
    }
    
    public authCompletedCB(fragment:any) {
        this.ngZone.run(()=>{
            
            this.localStorageService.setItem(this.tokenStoreKey, fragment.access_token);
                    
            this.router.navigate([fragment.state]);
        }); 
    }
    
    public getToken():string {
        return this.localStorageService.getItem(this.tokenStoreKey);
    }
    
    
}