import {Injectable} from 'angular2/core';
import {HttpProxy} from '../httpProxy/httpProxy'
import {Observable} from 'rxjs/Observable'
import {PlanModels} from '../models/plan.models'
import {Response} from 'angular2/http'
import 'rxjs/Rx'

@Injectable()
export class PlanService {

    constructor(private httpProxy: HttpProxy) {

    }

    private parsePlan(response: Response): PlanModels.Plan {
        let data = response.json();
        let plan: PlanModels.Plan = new PlanModels.Plan();

        plan.mapFromAny(data);

        return plan;
    }

    public getPlan(id: string): Observable<PlanModels.Plan> {
        let observable = this.httpProxy.get('/plan/' + id).map(this.parsePlan);

        return observable;
    }

    public createPlan(plan: PlanModels.Plan): Observable<PlanModels.Plan> {
        var body = JSON.stringify(plan);
        let observable = this.httpProxy.post('/plan', body, "application/json").map(this.parsePlan);

        return observable;
    }
}