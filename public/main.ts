import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './components/app.component'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {LocalStorageService} from './services/localStorage.service'
import {AuthService} from './services/auth.service'
import {HttpProxy} from './httpProxy/httpProxy'

bootstrap(AppComponent, [LocalStorageService, HttpProxy, AuthService, HTTP_PROVIDERS, ROUTER_PROVIDERS]);