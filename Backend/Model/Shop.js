const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({

    ShopID:{
        type: String,
        required: true

    },

    name:{
        type: String,
        required: true
    },

    filepath:{
        type:String
        
    },

     contact:{
        type:Number,
        required: true
    },

     catogory:{
        type:String,
        required: true
    },


     join:{
        type:String
    }
})

const Shop = mongoose.model("Shop",shopSchema);

module.exports = Shop;