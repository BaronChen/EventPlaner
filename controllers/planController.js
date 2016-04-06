var planManagementService = require('../services/planManagementService.js');
var Promise = require('bluebird');
var errorService = require('../services/errorService.js');


exports.init = function (app) {
    
    app.post('/plan', function (req, res) { 
        planManagementService.createPlan(req.body)
            .then(function(data){
                res.send(data);
            })
            .catch(function(error){
                var standardError = errorService.generateStandardErrorFromMongoose(error);
                res.statusCode = 400;
                res.send(standardError);
            });
    })
    
    app.get('/plan/:planId', function (req,res) {
        planManagementService.getPlan(req.params.planId)
            .then(function(data){
                res.send(data);                 
            })
            .catch(function (error) {
                var standardError = errorService.generateStandardErrorFromMongoose(error);
                res.statusCode = 400;
                res.send(standardError);
            });
    });
    
}