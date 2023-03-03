const  mongoose = require('mongoose')
const Schema =mongoose.Schema

const schema = new Schema({
    name : {type : String, require:true, trim: true},
    price:{type : Number},
    type: {type: Schema.Types.String, ref:'Type'}
        
},{ toJSON :{virtuals: true},
    timestamps: true,
    collection: "product" });

   schema.virtual('price_vat').get(function(){
        return(this.price*0.07) + this.price
   }) 
const product = mongoose.model("Product", schema)
module.exports  = product