import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Router} from 'angular2/router';

import {AuthComponent} from './authComponents/auth.component';
import {PlanDetailComponent} from './planComponents/planDetail.component';
import {NavbarComponent} from './navbarComponents/navbar.component';


@Component({
    selector: 'my-app',
    templateUrl: 'public/components/myapp.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig([
      {path:'/auth', name: 'Auth', component: AuthComponent},
      {path:'/planDetail/:id', name: 'PlanDetail', component: PlanDetailComponent},
])
export class AppComponent { 
    constructor(private router:Router){
        
    }
}
