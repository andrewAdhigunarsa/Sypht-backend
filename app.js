const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));

app.get("/",(req,res)=>{
    console.log('responding to request test');
    res.send('Woohoo');
})

app.listen(3003,()=>{
    console.log('testing for server 3003');
})