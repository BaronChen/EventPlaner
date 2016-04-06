import {Component} from "angular2/core"
import {AuthService} from "../../services/auth.service"



@Component({
    selector:"my-auth",
    templateUrl: "public/components/authComponents/myauth.html",
    providers: [AuthService]
})
export class AuthComponent {
    
    
    constructor(private authService:AuthService){
        
    }
    
    public logIn(){
        this.authService.login();
        
    }
    
    public logOut(){
        this.authService.logOut();
    }
    
   
    
}