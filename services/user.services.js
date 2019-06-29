const userModel = require('../app/models/user.model');

exports.registration = (data, callback) => {
    userModel.save(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};

exports.login = (data, callback) => {
    userModel.login(data, (error, wrongPassword, result, notRegistered) => {
        if (error) {
            callback(error);
        } else if (wrongPassword) {
            callback(null, wrongPassword, null);
        } else if (result != null) {
            callback(null, null, result);
        } else {
            callback(null, null, null, notRegistered);
        }
    });
};

exports.updateLogin = (data, callback) => {
    userModel.UpdateOne(data, (errorUpdate, resultLogin) => {
        if (errorUpdate) {
            callback(errorUpdate);
        } else {
            callback(null, resultLogin);
        }
    });
};

exports.logout = (data, callback) => {
    userModel.logout(data, (errorLogout, resultLogout) => {
        if (errorLogout) {
            callback(errorLogout);
        } else {
            callback(null, resultLogout);
        }
    });
}

exports.findToken = (data, callback) => {
    userModel.findToken(data, (errorToken, resultToken) => {
        if (errorToken) {
            callback(errorToken);
        } else {
            callback(null, resultToken);
        }
    });
};

exports.getAllUsers = (callback) => {
    userModel.getAllUsers((error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};