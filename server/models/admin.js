const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const adminSchema = new mongoose.Schema({
  
    email: {
        type: String,
        trim: true,
        required: true
    },
    fName: {
        type: String,
        trim: true,
        required: true
    },
    lName: {
        type: String,
        trim: true,
        required: true
    },

    photo: {
        data: Buffer,
        contentType: String,
    },

    price: {
        type: Number,
    },

    role: {
        type: String,
        default: "admin"
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated: Date,

    hashed_password: {
        type: String,
        
    },
    salt: String,
});



// virtual field
adminSchema.virtual("password")
.set(function(password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv4();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;   
});

// methods
adminSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
   
    encryptPassword: function(password) {
        if (!password) return "Please enter a password";
        try {
            const hash = crypto.createHmac('sha256', this.salt )
            .update(password)
            .digest('hex');
            
            return hash;
            
        } catch (err) {
            return err ;
        }
    }
};


module.exports = mongoose.model("Admin", adminSchema);



