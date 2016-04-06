import {Injectable} from 'angular2/core';

@Injectable()
export class LocalStorageService{
    
    private storage : any;
    
    constructor(){
        this.storage = localStorage;
    }
    
    setItem(key:string, item:any){
        this.storage.setItem(key, JSON.stringify(item));
    }
    
    getItem(key:string) : any{
        var item = this.storage.getItem(key);
        
        if (item && item != 'undefined'){
            return JSON.parse(item);
        }
        
        return undefined;
    } 
    
    removeItem(key:string){
        localStorage.removeItem(key);
    }
}