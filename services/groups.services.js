const groupModel = require('../app/models/groups.model');

exports.addData = (data, callback) => {
    groupModel.save(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.updateNewUser = (data, callback) => {
    groupModel.updateNewUser(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.removeUser = (data, callback) => {
    groupModel.removeUser(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}