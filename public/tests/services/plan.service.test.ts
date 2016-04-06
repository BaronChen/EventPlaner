import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
    injectAsync
} from 'angular2/testing';

import {PlanService} from './../../services/plan.service'
import {HttpProxy} from './../../httpProxy/httpProxy';
import {MockAuthService} from './mock.services.test';
import {AuthService} from './../../services/auth.service';
import {PlanModels} from './../../models/plan.models';

import {TestUtils} from './../utils/utils.test'

import {provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions, RequestOptionsArgs, Headers, RequestMethod} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';




describe('plan.service', () => {

    beforeEachProviders(() => [
        HttpProxy,
        HTTP_PROVIDERS,
        PlanService,
        provide(AuthService, { useClass: MockAuthService }),
        provide(XHRBackend, { useClass: MockBackend })
    ]);

    describe('#createPlan()', () => {
        it('Create plan should create a plan and get back a plan object with _id', inject([XHRBackend, PlanService], (mockBackend, planService: PlanService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    var body = connection.request.text();
                    var data = JSON.parse(body.toString());
                    data._id = 'mocking-id';

                    var url = connection.request.url;
                    expect(url).toBe('/plan');
                    var method = connection.request.method;
                    expect(method).toBe(RequestMethod.Post);

                    var options = new ResponseOptions({
                        body: data
                    });
                    connection.mockRespond(new Response(options));
                });

            let plan = new PlanModels.Plan();
            let viewModel = {
                "name": "Mocking Test Plan",
                "days": [{
                    "date": "2016-06-27",
                    "events": [
                        {
                            "date": "2016-06-27",
                            "memo": "stay at YHA",
                            "type": "catchup"
                        }
                    ]
                },
                    {
                        "date": "2016-06-28",
                        "events": [
                            {
                                "date": "2016-06-28",
                                "memo": "Take a bus to beach",
                                "type": "date"
                            },
                            {
                                "date": "2016-06-28",
                                "memo": "surfing",
                                "type": "meeting"
                            }
                        ]
                    }]
            };
            plan.mapFromAny(viewModel);

            planService.createPlan(plan).subscribe((data: PlanModels.Plan) => {
                expect(data.id).not.toBe(null);
                expect(data.name).toBe("Mocking Test Plan");
                expect(data.id).toBe("mocking-id");
                expect(data.days.length).toBe(2);
                expect(TestUtils.formatDate(data.days[1].date)).toBe('2016-06-28');
                expect(data.days[0].events.length).toBe(1);
                expect(data.days[0].events[0].memo).toBe("stay at YHA");

            });

        }));

    });

    describe('#getPlan()', () => {
        it('Get plan should get a plan with correct id', inject([XHRBackend, PlanService], (mockBackend, planService: PlanService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {

                    var url = connection.request.url;
                    expect(url).toBe('/plan/5700a8a064db6a1b08f27e4f');
                    var method = connection.request.method;
                    expect(method).toBe(RequestMethod.Get);

                    let data = { "__v": 0, "name": "First Plan", "_id": "5700a8a064db6a1b08f27e4f", "days": [{ "date": "2016-06-27T00:00:00.000Z", "_id": "5700a8a064db6a1b08f27e53", "events": [{ "date": "2016-06-27T00:00:00.000Z", "memo": "stay at YHA", "type": "catchup", "_id": "5700a8a064db6a1b08f27e54" }] }, { "date": "2016-06-28T00:00:00.000Z", "_id": "5700a8a064db6a1b08f27e50", "events": [{ "date": "2016-06-28T00:00:00.000Z", "memo": "Take a bus to beach", "type": "date", "_id": "5700a8a064db6a1b08f27e52" }, { "date": "2016-06-28T00:00:00.000Z", "memo": "surfing", "type": "meeting", "_id": "5700a8a064db6a1b08f27e51" }] }] }

                    var options = new ResponseOptions({
                        body: data
                    });
                    connection.mockRespond(new Response(options));
                });


            planService.getPlan("5700a8a064db6a1b08f27e4f").subscribe((data: PlanModels.Plan) => {
                expect(data.id).not.toBe(null);
                expect(data.id).toBe("5700a8a064db6a1b08f27e4f");
                expect(data.name).toBe("First Plan");
                expect(data.days.length).toBe(2);
                expect(TestUtils.formatDate(data.days[1].date)).toBe('2016-06-28');
                expect(data.days[0].events.length).toBe(1);
                expect(data.days[0].events[0].type).toBe(PlanModels.EventType.catchup);

            });

        }));

    });


});