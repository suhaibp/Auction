const mongoose = require("mongoose");
const config = require("../config/database");

const ProductsSchema = mongoose.Schema({
        name: {
            type : String,
            required : true,
        },
        image: {
            type : String,
        },
        desc: {
            type : String,
        },
        bid_amount: {
            type : Number,
            required : true,
        },
        min_bid_rate: {
            type : Number,
            deafult: 0
        },
        start_date : {
            type : Date,
            require:true
        },
        end_date : {
            type : Date,
            require:true
        },
        date_time : {
            type : Date,
            default: Date.now
        },
        intrested_ids: [{
            user_id: String ,
            date_time : { 
                type : Date, 
                default: Date.now
            } 
        }],
        bidders: [{
            user_id: String ,
            amount: Number,
            date_time : { 
                type : Date, 
                default: Date.now
            }, 
            bid_status : { 
                type : String, 
                default: "participated"
            } 
        }],
        is_bid_completed : {
            type: Boolean,
            default: false
        },
        starting_informed :{
            type: Boolean,
            default: false
        },
        closing_informed :{
            type: Boolean,
            default: false
        }
       
});

const Product = module.exports = mongoose.model('Product', ProductsSchema);

module.exports.addProduct = function(product,callback){
    console.log(product);
    var newProduct = new Product(product);
    Product.save(callback);
}

module.exports.getAllProduct = function(callback){
    Product.find({},callback);
}
module.exports.getAllCloasedProduct = function(callback){
    Product.find({"end_date" : {"$lt" : Date.now}},callback);
}

module.exports.deleteProduct = function(id,callback){
    const query = {_id: id}
    Product.remove(query,callback);
}

module.exports.getProductById = function(id,callback){
    Product.findOne({_id: id},callback);
}