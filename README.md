# Steps #
1. Clone 
2. npm install
3. Mongo db should be there
4. Run using nodemon src/index
5. In postman create new collection  
    a. set environment and environment variable {{url}} whose value is localhost:3000 
6. Q1 Create a new order by accepting the following JSON payload as a POST request, validate for
      duplicate orders based on order_id  
      Ex: Input =   
      {
        "order_id": "123",
        "item_name":"Samsung Mobile",
        "cost":"400",
        "order_date":"2020/12/01",
        "delivery_date":"2020/12/11"
    }  

    
    api POST - {{url}}/orders/create  
    body raw, json  
    {  
        "order_id": "123",  
        "item_name":"Samsung Mobile",  
        "cost":"400",  
        "order_date":"2020/12/01",  
        "delivery_date":"2020/12/11"  
    }

7. Q2 Update the order for a specific order ID to update the delivery_date based on the updated
      value provided to the API, can be GET or POST method.

    api POST - {{url}}/orders/update/2367  
    (here 2367 is order_id)  
    body raw json  
    {  
        "delivery_date": "2020/2/24"  
    }

8. Q3  List all orders for a given date in yyyy/mm/dd format.

    api GET - {{url}}/orders/list
   

9. Q4 Query for a specific order with Order ID, can be GET or POST method.  
   api GET  - {{url}}/orders/search/123  
   (here 123 is order_id)

9. Q5 Delete an order with Order ID.  
   api DELETE - {{url}}/orders/delete/236  
   (here 236 is order_id)