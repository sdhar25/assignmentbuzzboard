const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/buzzassign').catch((err)=>{
    console.log(err);
})
