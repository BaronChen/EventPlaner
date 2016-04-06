import {PlanModels} from './../../models/plan.models';
import {TestUtils} from './../utils/utils.test'

describe('Plan', () => {

   

    it('Event should be created base on the provided data', (done) => {
        var plan = new PlanModels.Event({ date: '2016-06-27', memo: 'something', type: 'catchup' });

        expect(TestUtils.formatDate(plan.date)).toBe('2016-06-27');
        expect(plan.type).toBe(PlanModels.EventType.catchup);
        expect(plan.memo).toBe('something');
        done();
    });

    it('Day should be created base on the provided data', (done) => {
        var day = new PlanModels.Day({
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
        });

        expect(TestUtils.formatDate(day.date)).toBe('2016-06-28');
        expect(day.events.length).toBe(2);
        done();
    });

    it('Plan should be created base on the provided data', (done) => {
        var plan = new PlanModels.Plan();
        plan.mapFromAny({
            "name": "Test Plan",
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
        });

        expect(plan.name).toBe("Test Plan");
        expect(plan.days.length).toBe(2);
        expect(TestUtils.formatDate(plan.days[0].date)).toBe('2016-06-27');
        expect(plan.days[1].events.length).toBe(2);
        expect(plan.days[1].events[1].type).toBe(PlanModels.EventType.meeting);
        expect(plan.days[1].events[0].memo).toBe("Take a bus to beach");
        done();
    });


});

