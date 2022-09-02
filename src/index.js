const express = require('express');
require('./db/mongoose');

const orderRouter = require('./router/order');
const app = express();


app.use(express.json());
app.use(orderRouter);

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' });

  })

app.listen(3000,()=>{
    console.log('LISTENING...');
})