const mongoose = require('mongoose');
const crypto = require('crypto');
const role = require('./role');

// user schema
const userScheama = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        employeeid: {
             type:String,
             required:true,
             unique:true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
      
        photo:{
            type:String
        },
        hashed_password: {
            type: String,
            // required: true
        },
        salt: String,
        role: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Role"
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamps: true }
);

// virtual
userScheama
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// methods
userScheama.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password; // true false
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userScheama);