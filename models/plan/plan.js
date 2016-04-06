var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    date:Date,
    memo:String,
    type:{                                    
        type:String,
        required: [true, 'Type is essetial for an events'],
        enum: ['date', 'catchup', 'meeting']
    }
});

var daySchema = new Schema({
    date: {
                type:Date,
                required:[true, 'Date is requeired for a day entry']       
            },
    events:[eventSchema]             
});

var planSchema = new Schema({
    name: {
                type:String,
                required: [true, 'Name is requeired for a plan']
          },
    days: [daySchema]
});


var Plan = mongoose.model('plan', planSchema)

module.exports = Plan;