import {Component} from "angular2/core"
import {COMMON_DIRECTIVES} from "angular2/common"
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from 'angular2/router';

import {
  Collapse,
  DROPDOWN_DIRECTIVES,
  Ng2BootstrapConfig,
  Ng2BootstrapTheme
} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
    selector: 'navbar',
    templateUrl: 'public/components/navbarComponents/navbar.html',
    directives: [Collapse, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, COMMON_DIRECTIVES]
})
export class NavbarComponent{
    
    constructor(private router:Router){
        
    }
    
    public isCollapsed:boolean = true;
    
    public toggleCollapse(){
        this.isCollapsed = !this.isCollapsed;
    }
    
    public isRouteActive(url:string):boolean{
        return this.router.isRouteActive(this.router.generate([url]));
    }
}