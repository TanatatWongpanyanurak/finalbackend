const  mongoose = require('mongoose')
const Schema =mongoose.Schema

const typeSchema = new Schema({
    pet:  { type: String, require: true, trim: true },
},{ toJSON :{virtuals: true},
    timestamps: true,
    collection: "types" });

    typeSchema.virtual('product',{
        ref:'Product',
        localField:'_id',
        foreignField:'type'

    })

const type = mongoose.model("Type", typeSchema)
module.exports  = type