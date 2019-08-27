require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

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
            res.send(response.data);
        }
    ).catch(
        (e)=>{
            res.send(e)
        }
    )
    
})

app.post('/upload',(req,res)=>{

    if(req.files !== null){
        const url = 'https://api.sypht.com/fileupload/';
        const headerToken = req.headers.Authorization;
        const file = req.files.file;

        file.mv(`${__dirname}/files/${file.name}`, (err)=>{
            if(err){
                console.log(err);
                return res.status(500).send(err)
            }

            const formData = {
                fileToUpload: fs.createReadStream(__dirname,file.name),
                fieldSets: JSON.stringify(['sypht.generic'])
            }
            const options = {
                url: url,
                formData: formData,
                headers: {
                    'Authorization': headerToken
                },
            }

            axios(options).then(
                (response) => {
                    console.log(response.data);
                    res.json({
                        fileName: file.name,
                        filePath: `${__dirname}/files`,
                        resData: response.data
                    })
                }
            ).catch(
                (e) => {
                    console.error(e);
                    res.status(400).send(e)
                }
            )
        })

    }
    return res.status(400).json({msg:'req is null'})
})

app.listen(3003,()=>{
    console.log('testing for server 3003');
})