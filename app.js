require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');

app.use(morgan('combined'));
app.use(cors());

app.get("/",(req,res)=>{
    console.log('responding to request test');
    res.send({hello:'testing'});
})

app.post("/token", (req,res) => {

    const URL = 'https://login.sypht.com/oauth/token/';
    const body = {
        client_id: process.env.NODE_APP_CLIENT_ID,
        client_secret: process.env.NODE_APP_CLIENT_SECRET,
        audience: "https://api.sypht.com",
        grant_type: "client_credentials"
    }
    const options = {
        method: "POST",
        url: URL,
        data: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    axios(options).then(
        (response)=>{
            console.log(response.data);
            res.send(response.data);
        }
    ).catch(
        (e)=>{
            console.error(e)
            res.send(e)
        }
    )
    
})

app.listen(3003,()=>{
    console.log('testing for server 3003');
})