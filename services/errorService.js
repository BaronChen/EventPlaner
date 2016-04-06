exports.generateStandardErrorFromMongoose = function(err) {
    var standardError = {
        messages:[]
    };

    if (err) {
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                standardError.messages.push(err.errors[field].message);        
            }
        } else {
            standardError.messages.push("Other error happen during save process.");
        }
    }
    
    return standardError;
}