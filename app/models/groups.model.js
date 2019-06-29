const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'group name is required'],
    },
    users: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
    creator_stamp: {
        type: Date,
        default: Date.now
    },
    update_stamp: {
        type: Date,
        default: Date.now
    },
});

const Group = mongoose.model('groups', GroupSchema);

function GroupSchemaModel() {

}

GroupSchemaModel.prototype.save = (data, callback) => {
    var newGroup = new Group(data);
    newGroup.save((error, result) => {
        console.log("Error : ", error);
        console.log("Result : ", result);
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

GroupSchemaModel.prototype.updateNewUser = (data, callback) => {
    Group.findOne({
        '_id': data._id
    }, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            console.log("model : ", result);
            // callback(null, result);
            for (var i = 0; i < data.users.length; i++) {
                var newGroup = new Group();
                var user = newGroup.users.create(data.users[i]);
                result.hashtag.push(user);
            }
            Redirect.updateOne({
                _id: result._id
            }, result, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    // console.log("model : ", result);
                    callback(null, result);
                }
            });
        }
    });
};

GroupSchemaModel.prototype.removeUser = (data, callback) => {
    Group.findOne({
        '_id': data._id
    }, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            console.log("model : ", result);
            // callback(null, result);
            for (var i = 0; i < result.users.length; i++) {
                if (result.users[i].user_id._id == data.user_id) {
                    result.users.splice(i, 1);
                }
            }
            Redirect.updateOne({
                _id: result._id
            }, result, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    // console.log("model : ", result);
                    callback(null, result);
                }
            });
        }
    });
}

module.exports = new GroupSchemaModel();