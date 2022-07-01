const {model, Schema} = require('mongoose');

const CharacterSchema = new  Schema({
    id:{type:Number},
    name:{type:String, required:true},
    status:{type:String},
    species:{type:String},
    type:{type:String},
    gender:{type:String},
    origin:{
        name:{type:String},
        url:{type:String},
    },
    location:{
        name:{type:String},
        url:{type:String},
    },
    image:{type:String},
    episode:[{type:String}],
    url:{type:String},
    created:{type:String}
});

module.exports = model("Character", CharacterSchema);