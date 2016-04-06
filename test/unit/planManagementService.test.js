'use strict';

var chai = require('chai');
var assert = chai.assert, expect = chai.expect, should = chai.should();
var proxyquire = require('proxyquire');

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

describe('planManagementService', function() {

    var Plan = undefined;
    var planManagementService = undefined;

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() { });
        }
    }

    before(function(done) {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect('mongodb://localhost:27017/travelplan-test-db', function(err) {
                if (err) {
                    throw err;
                }
                return done();
            });
        }
    })

    after(function(done) {
        mongoose.disconnect();
        done();
    });

    describe('#createPlan()', function() {

        beforeEach(function(done) {
            clearDB();
            return done();
        });

        beforeEach(function(done) {
            if (!Plan) {
                Plan = proxyquire('../../models/plan/plan.js', { 'mongoose': mongoose });
            }
            if (!planManagementService) {
                planManagementService = proxyquire('../../services/planManagementService.js', { '../models/plan/plan.js': Plan })
            }
            return done();
        });

        afterEach(function(done) {
            clearDB();
            return done();
        });


        it('it should save and return a plan object', function(done) {
            var planViewModel = {
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
            };

            planManagementService.createPlan(planViewModel).then(function(data) {
                data.name.should.equal('Test Plan');
                data._id.should.not.be.null;
                data.days.should.have.lengthOf(2);
                data.days[1].events.should.have.lengthOf(2);
                done();
            }).catch(function(error) {
                done(error);
            });

        });

        it('Plan should be rejected if there is no name', function(done) {
            var planViewModel = {
                "days": [{
                    "date": "2016-06-27",
                    "events": [
                        {
                            "date": "2016-06-27",
                            "memo": "stay at YHA",
                            "type": "catchup"
                        }
                    ]
                }]
            };

            //Chai as Promised doesn't work too well with bluebird.....Have to do this....    
            planManagementService.createPlan(planViewModel).then(function(data) {
                assert.fail();
            }).catch(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.should.not.be.null;
                error.errors.should.have.property('name');
                done();
            }).catch(function(error) {
                done(error);
            });

        });

        it('Plan should be rejected if there is no date in day object', function(done) {
            var planViewModel = {
                "name": "Test Plan",
                "days": [{
                    "events": [
                        {
                            "date": "2016-06-27",
                            "memo": "stay at YHA",
                            "type": "catchup"
                        }
                    ]
                }]
            };

            //Chai as Promised doesn't work too well with bluebird.....Have to do this....    
            planManagementService.createPlan(planViewModel).then(function(data) {
                assert.fail();
            }).catch(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.should.not.be.null;
                error.errors.should.have.property('days.0.date');
                done();
            }).catch(function(error) {
                done(error);
            });

        });

        it('Plan should be rejected if event has invalid enum', function(done) {
            var planViewModel = {
                "name": "Test Plan",
                "days": [{
                    "date": "2016-06-27",
                    "events": [
                        {
                            "date": "2016-06-27",
                            "memo": "stay at YHA",
                            "type": "lalala"
                        }
                    ]
                }]
            };

            //Chai as Promised doesn't work too well with bluebird.....Have to do this....    
            planManagementService.createPlan(planViewModel).then(function(data) {
                assert.fail();
            }).catch(function(error) {
                error.name.should.equal('ValidationError');
                error.errors.should.not.be.null;
                error.errors.should.have.property('days.0.events.0.type');
                done();
            }).catch(function(error) {
                done(error);
            });

        });
    });

    describe('#getPlan()', function() {
        var planId = undefined;
        
        beforeEach(function(done) {
            clearDB();
            return done();
        });

        beforeEach(function(done) {
            if (!Plan) {
                Plan = proxyquire('../../models/plan/plan.js', { 'mongoose': mongoose });
            }
            if (!planManagementService) {
                planManagementService = proxyquire('../../services/planManagementService.js', { '../models/plan/plan.js': Plan })
            }

            var planViewModel = {
                "name": "Get Plan Test",
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

            var plan = new Plan(planViewModel);

            plan.save(function(err) {
                planId = plan._id;
                done(err)
            })

        });

        afterEach(function(done) {
            clearDB();
            return done();
        });


        it('it should be able to get a plan', function(done) {
            planId.should.be.not.null;
            planManagementService.getPlan(planId.toString()).then(function(data){
                data._id.toString().should.equal(planId.toString());
                data.name.should.equal('Get Plan Test');
                data.days.should.have.lengthOf(2);
                data.days[0].events.should.have.lengthOf(1);
                done();
            }).catch(function(err){
                done(err);
            });
        });

         it('it should not be able to get a plan if id is incorrect', function(done) {
            var ObjectID = require('mongodb').ObjectID;
            var objectId = new ObjectID();
            
            planManagementService.getPlan(objectId).then(function(data){
                expect(data).to.be.null;
                done();
            }).catch(function(err){
                done(err);
            });
        });

    });

});