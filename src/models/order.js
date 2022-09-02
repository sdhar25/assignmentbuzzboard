const mongoose = require('mongoose');
const moment = require('moment');

const orderSchema = new mongoose.Schema({
    order_id:{
        type:String,
        required: true,
        trim: true,
        unique:[true,"sdfgh"],
    },
    item_name:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    order_date:{
        required:true,
        type:Date
    },
    delivery_date:{
        required:true,
        type:Date
    }
});

orderSchema.pre('save',async function(next){
    const cur_order =this;
    
    //order_date
    var wrapped_order_date =await Order.generateOrderDate(cur_order.order_date)
    cur_order.order_date =  wrapped_order_date;
    //console.log(cur_order.order_date);
    
    //delivery_date
    var wrapped_delivery_date =await Order.generateOrderDate(cur_order.delivery_date);
    cur_order.delivery_date =  wrapped_delivery_date;
    //console.log(cur_order.delivery_date);
    next();
});

//converting to '-' format .Used by both order_date and delivery_date
orderSchema.statics.generateOrderDate = async function(order_date)
{
    var required_date = new Date(order_date); 
    var wrapped_required_date =await moment(required_date).format('YYYY-MM-DD');
    return wrapped_required_date;
}

//converting to '/' format
orderSchema.statics.slashFormatDate =  function(order_date)
{
    var required_date = new Date(order_date); 
    var slash_required_date = moment(required_date).format('YYYY/MM/DD');
    return slash_required_date;
}

const Order = mongoose.model('Order',orderSchema);

module.exports= Order;