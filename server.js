// https://github.com/MicrosoftArchive/redis
const express = require('express')
const bodyParser = require('body-parser');

const port = process.env.port || 3000;

const app = express();

// DB configuration

const redis = require('redis')
const client = redis.createClient();

client.on('connect',()=>{
    console.log("Redis connected successfully...");
    
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.get('/user/',(req,res)=>{
    res.send("All users")
})
app.post('/user/add',(req,res)=>{
    const userName = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    client.hmset(email,["name",userName,"email",email,"age",age],(err, response)=>{
        if(err){
            console.log(err);
            
        }else{
            console.log(response);
            res.send(response)
            
        }
    })
    
})
app.delete('/user/:id',(req,res)=>{
    res.send('Delete user')
})
app.put('/user/:id',(req,res)=>{
    res.send('Udpate user')
})


app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    
})