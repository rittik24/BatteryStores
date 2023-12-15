const mongoose= require("mongoose");
const orderSchema= mongoose.Schema({
    userID:String,
    productID:{type: mongoose.Schema.Types.ObjectId, ref: 'battery'},
    qty:Number
},{
    versionKey:false
});

const OrderModel=mongoose.model("order",orderSchema);
module.exports={OrderModel};