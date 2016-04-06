var Plan = require('../models/plan/plan.js');
var Promise = require('bluebird');

exports.createPlan = function (planViewModel) {        
    return new Promise(function(resolve, reject){ 
        
        var plan = new Plan(planViewModel);
        
        plan.save(function(err) {
           if (err) {
				reject(err);
			} else {
                 //console.log("plan saved!")
				resolve(plan);
			} 
        })
	}); 
}

exports.getPlan = function (planId) {
    return new Promise(function(resolve, reject){
       
       Plan.findById(planId, function(err, plan) {
           if (err) {
				reject(err);
			} else {
                 //console.log("plan loaded!")
				resolve(plan);
			} 
       }); 
    });
}