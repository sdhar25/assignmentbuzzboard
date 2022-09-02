const express = require('express');
const router = new express.Router;
const Order = require('../models/order');


//Q1 insert orders
router.post('/orders/create',async(req,res,next)=>{
    try{
        //res.send(req.body);
        const order = new Order(req.body);
        await order.save();
        res.send(order);
    }catch(err)
    {
        
        if(err.code == 11000)
        {
            res.status(500).send({err:'Duplicte order id'});
        }
        else
        {
           next(err)
        }
    }
    
});

/* q2 Update the order for a specific order ID to update the delivery_date based on the updated
value provided to the API, can be GET or POST method.
*/

router.post('/orders/update/:order_id', async(req,res,next)=>{
    try{
        const order_id = req.params.order_id; 
        const delivery_date = await Order.generateOrderDate(req.body.delivery_date);
        const order = await Order.findOneAndUpdate({order_id:order_id},{delivery_date:delivery_date},{new:true});
        
        if(!order)
        {
            return res.status(400).send({err:"Order id not found"});
        }
        res.send(order);
    }catch(err)
    {
        //console.log(err);
       next(err);
    }
})

/* q3 List all orders for a given date in yyyy/mm/dd format.
*/ 

router.get('/orders/list',async(req,res,next)=>{
    try{
        let orders = await Order.find();
        if(!orders)
        {
            return res.status(400).send({err:"There are no orders"});
        }
        
        orders = orders.map((od)=>{
            let od_order_date = Order.slashFormatDate(od.order_date);
            let od_delivery_date = Order.slashFormatDate(od.delivery_date);

            return {
                order_id:od.order_id,
                item_name:od.item_name,
                cost:od.cost,
                order_date:od_order_date,
                delivery_date:od_delivery_date
            }
            
        })
        res.send(orders);
    }
    catch(err)
    {
        next(err);
    }
})


/* q4 Query for a specific order with Order ID, can be GET or POST method.*/

router.get('/orders/search/:order_id', async(req,res,next)=>{
    try{
        const order_id = req.params.order_id;
        let order = await Order.findOne({order_id:order_id});
        if(!order)
        {
            return res.status(400).send({err:"Provide correct order id"});
        }
        let req_orders ={
                order_id:order.order_id,
                item_name:order.item_name,
                cost:order.cost,
                order_date:Order.slashFormatDate(order.order_date),
                delivery_date:Order.slashFormatDate(order.delivery_date)
        }
        res.send(req_orders);

    }catch(err)
    {
        next(err);
    }
})


/** Q5 Delete an order with Order ID*/
router.delete('/orders/delete/:order_id',async(req,res,next)=>{
    try
    {
        const order_id = req.params.order_id;
        const delOrder = await Order.findOneAndDelete({order_id:order_id});
        if(!delOrder)
        {
            return res.status(400).send({err:"Provide correct order id"});
        }
        res.send(delOrder);

    }catch(err)
    {
        next(err);
    }
})
module.exports=router;