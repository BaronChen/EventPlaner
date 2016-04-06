import {Component} from 'angular2/core'
import {PlanService} from '../../services/plan.service'
import {PlanModels} from '../../models/plan.models'

@Component({
    selector: 'plan-detail',
    templateUrl: 'public/components/planComponents/planDetail.html',
    providers: [PlanService]
})
export class PlanDetailComponent{
    
    public plan : PlanModels.Plan = new PlanModels.Plan();
    
    public tempStr : string;
    
    constructor(private planService:PlanService){
     
    }
       
    get dianostic() { return JSON.stringify(this.plan); }
    
    public getPlan(id:string){
        this.planService.getPlan(id).subscribe(data => {
            this.plan = data;
        });
    }
    
    public createPlan(){
        var tempPlan = new PlanModels.Plan();
        tempPlan.mapFromAny(JSON.parse(this.tempStr));
        
        this.planService.createPlan(tempPlan).subscribe(data => {
            this.plan = data;
        });
    }
    
}